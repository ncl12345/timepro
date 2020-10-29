import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import React,{Component } from 'react'

class MySwiper extends Component{
    render() {
        return (
            <div className="swiper-container">
                {
                this.props.children
                }
            </div>
        )
        
    }
    componentDidMount() {
        new Swiper('.swiper-container',{
            loop:true
        })
    }
    
}
export default MySwiper

