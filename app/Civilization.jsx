

var Civilization = {
    happiness: 0,

    updates: {
        communication: new Billet('communication', {culture: culture_rate}, 1.6, "Raises culture soft-cap."),
        attentiveness: new Billet('attentiveness', {culture: culture_rate}, 1.7, "Soften culture soft-cap."),
        teamwork: new Billet('teamwork', {culture: culture_rate * 5}, 1.4, "Expands the maximum size of the teams."),
        sharing: new Billet('sharing', {culture: culture_rate * 10}, 1.7, "Expands maximum storage size."),
    },
    works: {
        popularization: new Workplace('popularization', {culture: culture_rate}, 1.4, "Slowly increase volunteers, consuming culture.",
            function () { return (Time.season == 'winter') ? 2 : 1; }),
        education: new Workplace('education', {culture: culture_rate}, 1.5, "Slowly increase knowledge, consuming enthusiasm.",
            function () { return (Time.season == 'autumn') ? 2 : 1; }),
        motivation: new Workplace('motivation', {culture: culture_rate}, 1.6, "Increases happiness, consuming culture.",
            function () { return (Time.season == 'spring') ? 2 : 1; }),
        activism: new Workplace('activism', {culture: culture_rate}, 1.7, "Decreases happiness, slowly increase enthusiasm and action points.",
            function () { return (Time.season == 'summer') ? 2 : 1; }),
    }
};

Civilization.tick = function() {
  //  console.log(Player, Civilization);
    Player.culture_rate = 0;

    this.happiness = 0;

    Player.culture_soft_cap = (Civilization.updates.communication.level) * 10;
    if (!Player.culture_soft_cap) Player.culture_soft_cap = 10;
    if (Player.culture_soft_cap < 10) Player.culture_soft_cap = 10;

    var soft_cap = Math.sqrt(Player.culture - Player.culture_soft_cap);
    Player.culture_rate = Civilization.getHappiness() * Player.volunteers * 0.1 / (soft_cap ? (soft_cap / ((( Civilization.updates.attentiveness.level - 1) * 0.1) + 1)) : 1);
   // console.log(Player.culture_rate, Civilization.happiness, Player.volunteers, soft_cap);
    if (Player.culture_rate > 0) Player.reward('culture', Player.culture_rate, 1);

    if (Civilization.works.motivation.workers > 0 &&
        Player.withdraw('culture', Civilization.works.motivation.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.works.motivation.workers * 0.01;
        this.happiness += Civilization.works.motivation.getEfficiency() / Civilization.getHappiness();
    }

    if (Civilization.works.activism.workers > 0) {
        Player.culture_rate -= Civilization.works.activism.workers * 0.01;
        this.happiness -= Civilization.works.activism.getEfficiency() / Civilization.getHappiness();
        var debuff = Player.volunteers_memory * 1000 + Player.action_points * 1000 + (Player.likes + Player.design * 10 + Player.money * 100 + Player.ideas * 1000);
        Player.enthusiasm += Civilization.works.activism.getEfficiency() / Civilization.getHappiness() * 0.1 * Math.max(0, (-1 * Math.pow((Player.enthusiasm-100)/100, 3)));
        Player.action_points += Civilization.works.activism.getEfficiency() / Civilization.getHappiness() * 50 / (1 + debuff);
    }

    // enthusiasm boost happiness
    this.happiness += Player.enthusiasm;


    if (Civilization.works.popularization.workers > 0 &&
        Player.withdraw('culture', Civilization.works.popularization.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.works.popularization.workers * 0.01;
        var new_volunteers = Civilization.works.popularization.getEfficiency() * 0.5 * 0.01 * Math.max(100, 200 - Player.volunteers_memory) / Math.pow(Player.volunteers_memory, 2);
        Gatherer.found(new_volunteers);
        Player.volunteers += new_volunteers;
        Player.volunteers_memory += new_volunteers;
    }

    if (Civilization.works.education.workers > 0 &&
        Player.withdraw('enthusiasm', Civilization.works.education.workers * 0.01, 1)) {
        //Player.culture_rate -= Civilization.works.education.workers * 0.01;
        Player.revealSecret('knowledge');
        Player.knowledge += Civilization.works.education.getEfficiency() * 5 * 0.01 / (2 * (1 + Player.writing + Player.drawing + Player.programming + Player.management + 5*Player.knowledge + 0.5*Player.volunteers_memory));
    }

};

Civilization.getHappiness = function() {
    return (1+(Civilization.happiness / 100));
};


// TODO: culture_rate should be in config
var CivilizationReact = React.createClass({
    getInitialState: function(){
        return {
            open: true,

            culture: 0,
            culture_soft_cap: 0,
            culture_rate: 0,

            happiness: 0,
            secrets: [], //Player.found_secrets,
            updates: [
                {
                    name: 'communication', 
                    base_cost: {culture: culture_rate}, 
                    cost_grow_rate: 1.6,
                    text: 'Raises culture soft-cap.'
                },
                {
                    name: 'attentiveness',
                    base_cost: {culture: culture_rate},
                    cost_grow_rate: 1.7,
                    text: "Soften culture soft-cap."
                },
                {
                    name: 'teamwork',
                    base_cost: {culture: culture_rate * 5},
                    cost_grow_rate: 1.4,
                    text: 'Expands the maximum size of the teams.'
                },
                {
                    name: 'sharing',
                    base_cost: {culture: culture_rate * 10},
                    cost_grow_rate: 1.7,
                    text: 'Expands maximum storage size.'
                },
            ],
            works: []
        };
    },
    updateCulture: function(culture) {
        this.setState({culture: culture})
    },
    onCollapse: function() {
        this.setState({open: !this.state.open})
    },
    unlockSecret: function(secret) {
        this.setState({secrets: this.state.secrets.concat(secret)})
    },
    render: function() {
        var updates = this.state.updates;
        var culture = this.state.culture;
        var culture_soft_cap = this.state.culture_soft_cap;
        var happiness = this.state.happiness;
        var culture_rate = this.state.culture_rate;
        var secrets = this.state.secrets;
        function secretClass(item) {
            return (secrets.indexOf(item.name) != -1)
        }
        return (
            <div>
                <hr />
                <button className="collapsar" onClick={this.onCollapse}>
                    {this.state.open?'-':'+'}
                </button>
                <div>
                    Community. 
                    <span title="many factors can change happiness">
                        Happiness bonus: <span>{happiness.toFixed(2)}</span>%
                    </span>
                </div>
                <ProgressGauge text="Culture: " a={culture} b={culture_soft_cap} aToFixed='2' bToFixed='2'>
                    (<span>{culture_rate.toFixed(2)}</span>/day)
                </ProgressGauge>
                <ReactBootstrap.Collapse in={this.state.open} >
                    <div className="flex-container-column" id="culture">
                        <div className="flex-container-row" id="culture_updates">
                            {updates.map(function(update, i){
                                return <BilletReact secretClass={secretClass(update)} {...update} ref={update.name} key={i}/>
                            })}
                        </div>
                        <br />
                        <div className="flex-container-row" id="culture_works">
                            {}
                        </div>
                    </div>
                </ReactBootstrap.Collapse>
            </div>
        )
    }
})

Civilization.getHTML = function() {


    var html = `    <hr>
        <button class="collapsar" data-toggle="collapse" data-target="#culture_collapse">-</button>
        <div>Community. <span title="many factors can change happiness">Happiness bonus: <span id="global_bonus_indicator">${Civilization.happiness.toFixed(2)}</span>%</span></div>
        <div>Culture: <span id="culture_indicator">${Player.culture.toFixed(2)}</span>/<span id="culture_limit_indicator">${Player.culture_soft_cap.toFixed(2)}</span> (<span id="culture_rate_indicator">${Player.culture_rate.toFixed(2)}</span>/sec)</div>
        <div class="collapse in" id="culture_collapse">
            <div class="flex-container-column" id="culture">
                <div class="flex-container-row" id="culture_updates">`;

    for (var key in Civilization.updates) {
        var update = Civilization.updates[key];
        var secret_class = (Player.found_secrets.indexOf(update.name) == -1) ? " init_hidden " : "";
        html += update.getHTML(key, secret_class, 'Civilization.upgradeUpdate');
    }

    html += `</div><br><div class="flex-container-row " id="culture_works">`;

    for (var key in Civilization.works) {
        var work = Civilization.works[key];
        var secret_class = (Player.found_secrets.indexOf(work.name) == -1) ? " init_hidden " : "";
        html += work.getHTML(key, secret_class, 'Civilization.upgradeWork');
    }

    html += `</div></div></div>`;

    return '';
};

Civilization.upgradeUpdate = function(update) {
    this.updates[update].upgrade();
};

Civilization.getUpgradeCostUpdate = function(update) {
    return this.updates[update].getUpgradeCost();
};

Civilization.increase = function(work) {
    this.works[work].increase();
};

Civilization.decrease = function(work) {
    this.works[work].decrease();
};

Civilization.upgradeWork = function(work) {
    this.works[work].upgrade();
};

Civilization.getUpgradeCostWork = function(work) {
    return this.works[work].getUpgradeCost();
};


