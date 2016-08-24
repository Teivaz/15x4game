/* props:
 *  text
 *  name
 *  base_cost
 *  cost_grow_rate
 *  secret_class
 *  onUpgrade
 *
 */

 // TODO: get rid of Player
var BilletReact = React.createClass({
    upgrade: function() {
        if (this.state.level >= 60) {
            message("Max level");
            return false;
        }
        if (!Player.checkEnthusiasm()) return false;

        if (Player.withdrawArray(this.getUpgradeCost())) {
            Player.enthusiasm--;
            var level = this.state.level + 1;
            this.props.onUpgrade && this.props.onUpgrade(this.props.name, level);
            this.setState({level: level});
            return true;
        }
        return false;
    },

    getInitialState: function() {
        return {
            level: 1,
            secret_class: this.props.secret_class
        };
    },

    getUpgradeCost: function() {
        var cost = {};
        var base_cost = this.props.base_cost;
        var cost_grow_rate = this.props.cost_grow_rate;
        for (var key in base_cost) {
            cost[key] = base_cost[key] * Math.pow(this.state.level, cost_grow_rate);
        }
        return cost;
    },
    
    render: function() {
        var name = this.props.name;
        var price = [];
        var upgrade_cost = this.getUpgradeCost();
        for (var resource_name in upgrade_cost) {
            price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
        }
        price = price.join(', ');

        var level = this.props.level;
        var hidden_class = this.state.secret_class ? 'init_hidden' : '';
        return (
            <div className={'flex-element flex-container-column '+hidden_class} id={name+'_container'}>
                <div className="flex-element flex-container-row ">
                    {name.capitalizeFirstLetter()}
                    <div className={hidden_class}>: <span id={name+'level'}>{level}</span></div>
                </div>
                <div className="flex-element"><button onClick={this.upgrade}>Up: {price}</button></div>
                <div className="flex-element">{this.props.text}</div>
            </div>
        )
    }
})
