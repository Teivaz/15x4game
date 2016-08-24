
/* text: a/b
 * @prop text - what to display
 *
 */

var ProgressGauge = React.createClass({
	render: function() {
		var a = this.props.a;
		if(this.props.aToFixed)
			a = a.toFixed(this.props.aToFixed);
		var b = this.props.b;
		if(this.props.bToFixed)
			b = b.toFixed(this.props.bToFixed);
		return(
			<span>
				{this.props.text}{': '}
				<span className="progress-gauge">{a}/{b}</span>
			</span>
		)
	}
});
