import React, { Component } from 'react'
import Particles from 'react-particles-js';
export default class Login extends Component {
    state={
        height:6
    }
    render() {
        return (
            <Particles 
                params={{
                        particles: {
                            line_linked: {
                                shadow: {
                                    enable: true,
                                    color: "#3CA9D1",
                                    blur: 5
                                }
                            }
                        }
                    }}
                style={{
                    width: '100%',
                    height: this.state.height
                    // backgroundImage: `url(${logo})` 
                }}
            />
        )
    }
    componentDidMount() {
        this.setState({
            height:window.innerHeight-15+'px'
        })
    }
    
}
