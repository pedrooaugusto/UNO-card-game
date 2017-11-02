import React from 'react';

const style = {
    title:{
        "fontWeight":  "bolder",
        "textAlign" :  "center",
        "fontSize"  :  "4rem",
        "color"      :  "#ffc821",
        "textShadow":  "2px 2px 0px black",
        "marginBottom" :  "5px"
    },
    description:{
        "textAlign" :  "center",
        "fontSize"  :  "1.2rem",
        "color"      :  "white",
        "textShadow":  "1px 1px 1px black",
        "margin"    :  "0px"
    }
};
class Title extends React.Component{
    
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }
    render(){
        return(
            <div>
                <h1 style={style.title}>
                    UNO
                </h1>
                <p style={style.description}>
                    Jogue <b>UNO</b> online com seus amigos. Its free!
                </p>
            </div>
        );
    }
}
export default Title;