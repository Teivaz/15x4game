//var system_events = require('./system-events');

var LogPanelSingleFilter = React.createClass({
    getInitialState: function() {
        return {checked: true}
    },
    onChange: function() {
        var checked = !this.state.checked;
        this.props.onChange(this.props.name, checked);
        this.setState({checked: checked});
    },
    render: function(){
        return(
            <span>
                <input type='checkbox' checked={this.state.checked} onChange={this.onChange} />
                {this.props.name} 
            </span>
        )
    }
});

var SideBarReact = React.createClass({
    getInitialState: function() {
        return {
            open: true,
            filters: ["Badge", "Not enough", "Paid", "Gained", "Reward", "Max", "Lecturer"],
            day: 0
        };
    },
    componentDidMount: function() {
        system_events.time.register(this, function(time) {
            this.setState({day: time.ticks});
        });
    },
    onFilter: function(filter, state) {
        this.refs.log.filter(filter, !state);
    },
    onCollapse: function() {
        var open = !this.state.open;
        this.setState({open: open})
        // TODO: fix next line
        $('#main_content').toggleClass('main_content80 main_content100');
    },
    clear: function() {
        this.refs.log.clear();
    },
    render: function(){
        var day = this.state.day;
        var filters = this.state.filters;
        return(
            <aside className="sidebar">
                <span>Log Panel</span>
                <button onClick={this.clear}>Clear Log</button>
                <button id="log_panel_button" className="collapsar" style={{top: '0px'}} onClick={this.onCollapse}>
                    {this.state.open?'-':'+'}
                </button>
                <div>Day: <span id="day_indicator">{day}</span></div>
                <hr />
                <ReactBootstrap.Collapse in={this.state.open} >
                    <div>
                        {filters.map( function(name, i) {
                            return <LogPanelSingleFilter onChange={this.onFilter} key={i} name={name} />
                        }, this)}
                        <hr />
                        <LogPanelContent ref='log' id="log_panel_collapse" />
                    </div>
                </ReactBootstrap.Collapse>
            </aside>
        );
    }
});

var LogPanelContent = React.createClass({
    getInitialState: function(){
        return {
            messages: [],
            filter: {}
        };
    },
    componentDidMount: function() {
        system_events.logger.register(this, this.addMesage);  
    },
    clear: function(){
        this.setState({messages: []});
    },
    filter: function(text, hide) {
        var filter = this.state.filter;
        filter[text] = hide;
        this.setState({filter: filter});
    },
    addMesage: function(message) {
        var messages = this.state.messages;
        messages.unshift(message);
        this.setState({messages: messages});
    },
    render: function() {
        var messages = this.state.messages;
        var filter = this.state.filter;
        var avoid = [];
        for(var key in filter) {
            if(filter[key]) avoid.push(key);
        }
        function shouldShow(message) {
            return !avoid.some(function(f) {
                return message.text.includes(f)
            })
        }
        return (
            <ul>
                {messages.map(function(message, i){
                    if(shouldShow(message)) {
                        return (
                            <li key={i}><div className="log_message_element">
                                <span className="log_message_name"> {message.text} </span>
                            </div></li>
                        );
                    }
                }, this)}
            </ul>
        )
    }
});
