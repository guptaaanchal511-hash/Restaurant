import {useState,useEffect} from 'react';
import {serverURL,getData,postData} from '../../services/FetchNodeServices';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Heading from '../Heading/Heading/Heading';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Avatar from '@mui/material/Avatar';
import Swal from 'sweetalert2'


export default function RestaurantInterface(){
    const Styles = {
        root:{
            width: "100vw",
            height: "100vh",
            backgroundColor:'#6F4e37',
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
        },
        box: {
            width: '70%',
            height: 'auto',
            background: '#F5E6CA',
            borderRadius: '10px',
            padding:'18px',
            boxSizing: 'border-box'
        },
        center: {
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }
    };

 const [states,setStates] = useState([]);
 const [stateid,setStateid] = useState('');
 const [cities,setCities] = useState([]);
 const [cityid,setCityid] = useState('');
 const [restaurantName,setRestaurantName] = useState('');
 const [ownerName,setOwnerName] = useState('');
 const [address,setAddress] = useState('');
 const [phonenumber,setPhonenumber] = useState('');
 const [mobileno,setMobileno] = useState('');
 const [gstType,setGstType] = useState('');
 const [emailid,setEmailid] = useState('');
 const [url,setUrl] = useState('');
 const [fssai,setFssai] = useState('');
 const [gstNumber,setGstNumber] = useState('');
 const [fileFssai,setFileFssai] = useState(null);
 const [fileShopAct,setFileShopAct] = useState(null);
 const [fileLogo,setFileLogo] = useState(null);


 const fetchAllStates=async()=>{
    var result=await getData('statecity/fetch_all_states');
    console.log(result.data)
    setStates(result.data)
    }

   const handleStateChange=(event)=>{
    setStateid(event.target.value)
    setCityid('')
    fetchAllCities(event.target.value);
   }

   const fetchAllCities = async (id) => { 
    var body = { stateid: id };
    var result = await postData('statecity/fetch_all_cities',body);
    console.log("CITY RESULT:",result);
    console.log("CITY DATA:",result.data);
    setCities(result.data);
}

  const handlefssai=(event)=>{
     const file = event.target.files[0];
     if (file) setFileFssai({url:URL.createObjectURL(file),bytes:file});
   }

     const handleShopAct=(event)=>{
     const file = event.target.files[0];
     if (file) setFileShopAct({url:URL.createObjectURL(file),bytes:file});
     }

     const handleLogo=(event)=>{
     const file = event.target.files[0];
     if (file) setFileLogo({url:URL.createObjectURL(file),bytes:file});
     }

 useEffect(function(){
    fetchAllStates();
 },[])

  const handleSubmit=async()=>{
    var formData = new FormData();
    formData.append('restaurantname', restaurantName);
    formData.append('ownername', ownerName);
    formData.append('phonenumber', phonenumber);
    formData.append('mobileno', mobileno);
    formData.append('url', url);
    formData.append('fssai', fssai);
    formData.append('gstno', gstNumber);
    formData.append('gsttype', gstType);
    formData.append('emailid', emailid);
    formData.append('filefssai', fileFssai.bytes);
    formData.append('fileshopact', fileShopAct.bytes);
    formData.append('address', address);
    formData.append('filelogo', fileLogo.bytes);
    formData.append('stateid', stateid);
    formData.append('cityid', cityid);

    var result = await postData('restaurant/restaurant_submit', formData);
    if(result.message)
    {
        Swal.fire({
            icon:'success',
            title:'Restaurant Registration',
            text:result.message
        })
    }
    else
    {
        Swal.fire({
            icon:'error',
            title:'Restaurant Registration',
            text:result.message
        })
    }
  }


  const fillStates = () => {
    return states.map((item) => {
        return (
            <MenuItem key={item.stateid} value={item.stateid}>
                {item.statename}
            </MenuItem>
        );
    });
};
const fillCities = () => {
    return cities.map((item) => {
        return (
            <MenuItem key={item.cityid} value={item.cityid}>
                {item.cityname}
            </MenuItem>
        );
    });
}

    return (
        <div style={Styles.root}>
            <div style={Styles.box}>
            <Grid container spacing={2}>
                 <Grid size={{ xs : 12}}>
                    <Heading title="Restaurant Registration"/>      
                </Grid>
                 <Grid size={{xs:6}}>
                    <TextField label="Restaurant Name" fullWidth size="small" onChange={(event)=>setRestaurantName(event.target.value)}/>
                </Grid>
                 <Grid size={{xs:6}}>
                    <TextField label="Owner Name" fullWidth size="small" onChange={(event)=>setOwnerName(event.target.value)}/>
                </Grid>
                 <Grid size={{xs:4}}>
                    <TextField label="Phone Number" type="tel" fullWidth size="small" onChange={(event)=>setPhonenumber(event.target.value)}/>
                </Grid>
                 <Grid size={{xs:4}}>
                    <TextField label="Mobile Number" type="tel" fullWidth size="small" onChange={(event)=>setMobileno(event.target.value)}/>
                </Grid>
                 <Grid size={{xs:4}}>
                    <TextField label="Email Address" fullWidth size="small" onChange={(event)=>setEmailid(event.target.value)}/>
                </Grid>
                <Grid size={{xs:12}}>
                    <TextField label="Address" fullWidth size="small" onChange={(event)=>setAddress(event.target.value)}/>
                </Grid>
                 <Grid size={{ xs : 4 }}>        
                   <FormControl fullWidth size="small">
                 <InputLabel id="demo-simple-select-label">-Select States-</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         label="State"
                         value={stateid}
                         onChange={handleStateChange}
                         >
                        <MenuItem value="">--Select State--</MenuItem>
                         {fillStates()}
                   </Select>
                  </FormControl>

             </Grid>
                <Grid size={{ xs:4 }}>
                   <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">-Select Cities-</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                     id="demo-simple-select-city"
                     label="City"
                     value={cityid}
                     onChange={(event)=>setCityid(event.target.value)}>
                       <MenuItem value="">--Select City--</MenuItem>
                        {fillCities()}
                  </Select>
                </FormControl>
            </Grid>
            <Grid size={{xs:4}}>
               <TextField label="URL" fullWidth size="small" onChange={(event)=>setUrl(event.target.value)}/>
            </Grid>
             <Grid size={{xs:4}}>
               <TextField label="Fssai Number" fullWidth size="small" onChange={(event)=>setFssai(event.target.value)}/>
            </Grid>
            <Grid size={{xs:4}}>
               <TextField label="GST Number" fullWidth size="small" onChange={(event)=>setGstNumber(event.target.value)}/>
            </Grid>
            <Grid size={{ xs:4 }}>
                   <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">-GST Types-</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     label="GST Type"
                     value={gstType}
                     onChange={(event)=>setGstType(event.target.value)}>
                       <MenuItem value="">--Select GST Type--</MenuItem>
                       <MenuItem value="5 Star">5 Star</MenuItem>
                       <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
             <Grid size={{xs:4}}>
                <Grid container spacing={1} direction="column">
                    <Grid style={Styles.center}>
                     <Avatar
                            variant="rounded"
                            sx={{ width: 48, height: 48}}
                            alt="Remy Sharp"
                            src={fileFssai?.url}
                        >
                        </Avatar>
                    </Grid>
                    <Grid>
                        <Button component="label" variant="contained" color="primary" fullWidth size="small" endIcon={<UploadFileIcon />}>
                      <input onChange={handlefssai} type="file" accept="image/*" hidden/>
                            Upload Fssai
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid size={{xs:4}}>
                <Grid container spacing={1} direction="column">
                    <Grid style={Styles.center}>
                        <Avatar
                            variant="rounded"
                            sx={{ width: 48, height: 48}}
                            alt="Remy Sharp"
                            src={fileShopAct?.url}
                        >
                        </Avatar>
                    </Grid>

                    <Grid>

                        <Button component="label" variant="contained" color="primary" fullWidth size="small" endIcon={<UploadFileIcon />}>
                            <input onChange={handleShopAct} type="file" accept="image/*" hidden/>
                            Upload Shop Act
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

       <Grid size={{xs:4}}>
                <Grid container spacing={1} direction="column">
                    <Grid style={Styles.center}>
                      <Avatar
                            variant="rounded"
                            sx={{ width: 48, height: 48}}
                            alt="Remy Sharp"
                            src={fileLogo?.url}
                        >
                        </Avatar>
                    </Grid>
                    <Grid>
                        <Button component="label" variant="contained" color="primary" fullWidth size="small" endIcon={<UploadFileIcon />}>
                            <input onChange={handleLogo} type="file" accept="image/*" hidden/>
                            Upload Logo
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

         <Grid size={{xs:6}}>
                <Button onClick={handleSubmit} component="label" variant="contained" color="primary" fullWidth  >
                Submit
                </Button>
            </Grid>
            <Grid size={{xs:6}}>
                <Button component="label" variant="contained" color="primary" fullWidth >
                Reset
                </Button>
            </Grid>
            </Grid>
       </div>
    </div>
    );
}