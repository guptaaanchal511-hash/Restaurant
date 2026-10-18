const styles = {
        heading:{
            fontFamily:'Unna',
            fontSize:'30px',
            fontWeight:'bold',
            color:'#603d2c',
            marginBottom:'20px',
            display:'flex',
            alignItems:'center'
        }
    };

 export default function Heading({title}){

     return (  
            <div style={styles.heading}>
                <img src="./chefs.png" alt="logo" style={{width:'60px',height:'60px'}}/>
               {title}
            </div>
    )
}
