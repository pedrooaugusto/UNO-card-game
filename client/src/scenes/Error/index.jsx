import React from 'react';
import {Link} from 'react-router-dom'; 
import './styles.css';

class Error extends React.Component{
	componentDidMount() {
		document.title = "Uno - Error";
	}
	render(){
		return(
			<div className="scene--error">
				<div className="container error--container">
					<div className="row valign-wrapper">
						<div className="col l12 valign">
							<div className="error">
								<div className="error--wrapper">
									<div className="error__statusCode">
										<span className="code">{this.props.statusCode}</span>
										<span className="txt">~err</span>
									</div>
									<div className="error__primaryText">
										<span className="bold">You</span> <span>should&#39;nt</span> be here!
									</div>
									<div className="error__secondaryText">
										{this.props.message}
									</div>
									<div className="error__homeButton">
										<Link to="/" className="link">Go home</Link>
									</div>
									<div className="error__gitButton">
										<a href="https://github.com/pedrooaugusto" className="link">@pedrooaugusto</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Error;