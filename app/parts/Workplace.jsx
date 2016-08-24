//var events = require('../system-events');

/* props:
 *  text
 *  name
 *  base_cost
 *  cost_grow_rate
 *  secret_class
 *  onUpgrade
 *
 */

var WorkplaceReact = React.createClass({

	upgrade: BilletReact.prototype.upgrade,
	getUpgradeCost: BilletReact.prototype.getUpgradeCost,

	getInitialState: function() {
		return {
            level: 1,
            secret_class: this.props.secret_class,
			season_bonus: 2,
			season: 'winter',
			workers: 0,
			happiness: 0,
			teamwork: 1, //Civilization.updates.teamwork.level
			volunteers: 0, //Player.volunteers
		};
	},

	getEfficiency: function() {
		var season_bonus = (this.props.season == this.state.season) ? this.state.season_bonus : 1;
		return this.state.happiness * this.state.workers * (1 + (0.1 * this.state.level)) * season_bonus;
	},

	getProductivity: function() {
		var season_bonus = (this.props.season == this.state.season) ? this.state.season_bonus : 1;
        var adjustment = 10 / 60 / 60;
        //   console.log(this.name, rate, adjustment);
        return this.getEfficiency() * /*this.props.base_rate * */adjustment * season_bonus;

	},

    increase: function() {
        if (this.state.volunteers < 1) {
            message.notEnough('Not enough free volunteers');
        } else if (this.state.workers + 1 > this.state.teamwork) {
            message.notEnough('Not enough teamwork');
        } else {
            Player.volunteers--;
            var workers = this.state.workers + 1;
            this.setState({workers: workers});
        }
    },

   	decrease: function() {
        if (this.state.workers >= 1) {
            Player.volunteers++;
            var workers = this.state.workers - 1;
            this.setState({workers: workers});
        }
        else {
            message.notEnough('Not enough volunteers in department');
        }
    },

	render: function() {
        var name = this.props.name;
        var upgrade_cost = this.getUpgradeCost();
        var price = [];
        for (var resource_name in upgrade_cost) {
            price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
        }
        price = price.join(', ');
		var season_bonus = (this.props.season == this.state.season) ? this.state.season_bonus : 1;
		var season_bonus_text = (season_bonus > 1) && ('Season bonus: '+season_bonus*100+'%');
        var hidden_class = this.state.secret_class ? 'init_hidden' : '';
        var level = this.state.level;

		return(
			<div>
			    <div className={'flex-element flex-container-column '+hidden_class} id={name+'_container'}>
			        <div className="flex-element flex-container-row">
			            {name.capitalizeFirstLetter()}
			            <div className={hidden_class}>: <span id={name+'_level'}>{level}</span></div>
			        </div>
			        <div className="flex-element">{season_bonus_text}</div>
				    <div className="flex-element">
				        <button onClick={this.upgrade}>Up: {price}</button>
				    </div>
				    <div className="flex-element">
				        <span id={name+'_volunteers'}>Workers: {this.state.workers}/{this.state.teamwork}</span>
				        <button onClick={this.increase}> + </button>
				        <button onClick={this.decrease}> - </button>
				    </div>
				    <div className="flex-element">
				        Efficiency: <span id={name+'_productivity'}>{this.getEfficiency().toFixed(2)}</span>
				    </div>
			    	<div className="flex-element">{this.props.text}</div>
			    </div>		
			</div>
		);
	}
})
