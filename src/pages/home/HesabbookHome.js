import {Header} from "../Header";
import computer from '../../images/computer.jpg'
import Industry from '../../images/Industry.svg'
import '../Image.css';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import {Box, TextField} from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import PhoneIcon from '@mui/icons-material/Phone';
import IconButton from '@mui/material/IconButton';
import EastTwoToneIcon from '@mui/icons-material/EastTwoTone';
import * as React from 'react';
import {Transition} from 'react-transition-group';
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import {Sheet} from "@mui/joy";
import axios from "axios";
import {SAVE_TEMP_PASSWORD} from "../apiendpoint/APIEndPoint";
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export const HesabbookHome = ({onBooleanChange}) => {
    const randomValue = generateRandomAlphaNumeric(5);
    const [open, setOpen] = React.useState(false);
    const [phone, setPhone] = React.useState('');
    const [openPassword, setOpenPassword] = React.useState(false);
    const [otpPassword, setOtpPassword] = React.useState('');
    const [user, setUser] = React.useState({mobileNumber: '', tempPassword: ''});
    const dispatch = useDispatch();
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    const handleOpen = (e) => {
        setOpen(true);
        setOtpPassword(randomValue)

    };
    const handleClose = () => {
        setOpen(false)
    };
    const handlePhoneChange = (value) => {
        setPhone(value);
    };
    const handleOtpPassword = () => {
        setOpenPassword(false);
        setOtpPassword(null);
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const classes = useStyles();
    {
        /*
        handle to open new tab...
         */
    }
    const handleClick = (e) => {
        handleSubmitToApi();
        e.preventDefault();
        setOpenPassword(true);
        handleClose();
    };

    function handleSubmit() {
    }

    const handleSubmitToApi = async () => {
        try {
            const response = await axios.post(SAVE_TEMP_PASSWORD, {
                mobileNumber: phone,
                tempPassword: otpPassword
            }, axiosConfig);


        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Header onBooleanChange={onBooleanChange}></Header>
            <Box style={{
                backgroundImage: `url(${computer})`, height: '600px', width: '100%'
            }}>
                <Box sx={{
                    width: '100%', paddingRight: '150px',
                    marginTop: '200px',
                    display: 'inline-grid',
                    justifyContent: 'right'
                }}>
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                    >
                        <IconButton sx={{p: '10px'}} aria-label="menu">
                            <PhoneIcon sx={{color: "#212121"}}/>
                        </IconButton>
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="+91   Enter Mobile Number"
                            inputProps={{'aria-label': 'search google maps'}}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                        />
                        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                        <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
                            <EastTwoToneIcon onClick={handleOpen} sx={{color: "green"}}/>
                        </IconButton>
                    </Paper>
                </Box>
            </Box>
            <Box sx={{width: '100%', paddingLeft: '30px', marginTop: '20px', display: 'flex'}}>
                <Box sx={{width: '50%'}}>
                    <Typography variant="h2" gutterBottom sx={{
                        margin: '10px', justifyContent: 'center', display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '36px', marginTop: '20px', marginBottom: '40px'
                    }}>
                        Solutions tailored for your industry</Typography>
                    <Typography variant="h5" gutterBottom sx={{
                        margin: '10px',
                        marginLeft: '50px', justifyContent: 'center', display: 'flex',
                        flexDirection: 'column'
                    }}>
                        No matter what industry you're in, your business is unique. Don't settle for a one-size-fits-all
                        solution. Sage Intacct is built to suit your industry's specific needs
                    </Typography>
                    <Box sx={{width: '100%', display: 'flex'}}>
                        <Box sx={{width: '50%', marginTop: '20px'}}>
                            <Typography variant="h6"
                                        sx={{
                                            margin: '10px',
                                            marginLeft: '70px',
                                            textDecoration: 'underline',
                                            color: '#23527c'
                                        }}>
                                Accountants & CPA firms
                            </Typography> <Typography variant="h6" sx={{
                            margin: '10px',
                            marginLeft: '70px',
                            textDecoration: 'underline', color: '#23527c'
                        }}>
                            Biotech & life sciences
                        </Typography> <Typography variant="h6" sx={{
                            margin: '10px',
                            marginLeft: '70px',
                            textDecoration: 'underline', color: '#23527c'
                        }}>
                            Construction
                        </Typography> <Typography variant="h6" sx={{
                            margin: '10px',
                            marginLeft: '70px',
                            textDecoration: 'underline', color: '#23527c'
                        }}>
                            Contractor
                        </Typography> <Typography variant="h6" sx={{
                            margin: '10px',
                            marginLeft: '70px',
                            textDecoration: 'underline', color: '#23527c'
                        }}>
                            Financial Services
                        </Typography> <Typography variant="h6" sx={{
                            margin: '10px',
                            marginLeft: '70px',
                            textDecoration: 'underline', color: '#23527c'
                        }}>
                            Franchise
                        </Typography> <Typography variant="h6" sx={{
                            margin: '10px',
                            marginLeft: '70px',
                            textDecoration: 'underline', color: '#23527c'
                        }}>
                            Healthcare
                        </Typography>
                        </Box>
                        <Box sx={{width: '50%', marginTop: '20px'}}>
                            <Typography variant="h6"
                                        sx={{margin: '10px', textDecoration: 'underline', color: '#23527c'}}>
                                Hospitality
                            </Typography> <Typography variant="h6" sx={{
                            margin: '10px',
                            textDecoration: 'underline',
                            color: '#23527c'
                        }}>
                            Nonprofit
                        </Typography> <Typography variant="h6"
                                                  sx={{margin: '10px', textDecoration: 'underline', color: '#23527c'}}>
                            Professional services
                        </Typography> <Typography variant="h6"
                                                  sx={{margin: '10px', textDecoration: 'underline', color: '#23527c'}}>
                            Retail
                        </Typography> <Typography variant="h6"
                                                  sx={{margin: '10px', textDecoration: 'underline', color: '#23527c'}}>
                            SaaS & subscription
                        </Typography>
                            <Typography variant="h6"
                                        sx={{margin: '10px', textDecoration: 'underline', color: '#23527c'}}>
                                Wholesale Distribution
                            </Typography>
                            <Typography variant="h6"
                                        sx={{margin: '10px', textDecoration: 'underline', color: '#23527c'}}>
                                All industries
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{width: '50%'}}>
                    <img src={Industry}/>
                </Box>
            </Box>
            <Box align="center">
                <Typography variant="h2" align="center" sx={{
                    justifyContent: 'center', display: 'flex',
                    flexDirection: 'column', marginTop: '20px', marginBottom: '50px'
                }}>
                    Get more than just great software</Typography>
                <Typography variant="h5" align="center"
                            sx={{
                                justifyContent: 'center', display: 'flex',
                                flexDirection: 'column', marginTop: '20px', marginBottom: '50px', textWrap: 'break-all'
                            }}>
                    All Sage customers are part of the Sage community. As a Sage member, you can enjoy benefits,
                    connect with experts and industry peers, and get insights that help you and your business.
                </Typography>
            </Box>
            <div className="w3-row-padding">
                <div className="w3-third w3-margin-bottom">
                    <ul className="w3-ul w3-border w3-center w3-hover-shadow">
                        <li className="w3-black w3-xlarge w3-padding-32">Silver</li>
                        <li className="w3-padding-16"><b>10GB</b> Storage</li>
                        <li className="w3-padding-16"><b>10</b> Emails</li>
                        <li className="w3-padding-16"><b>10</b> Domains</li>
                        <li className="w3-padding-16"><b>Endless</b> Support</li>
                        <li className="w3-padding-16">
                            <h2 className="w3-wide">$ 10</h2>
                            <span className="w3-opacity">per month</span>
                        </li>
                        <li className="w3-light-grey w3-padding-24">
                            <button className="w3-button w3-green w3-padding-large">Sign Up</button>
                        </li>
                    </ul>
                </div>
                <div className="w3-third w3-margin-bottom">
                    <ul className="w3-ul w3-border w3-center w3-hover-shadow">
                        <li className="w3-green w3-xlarge w3-padding-32">Gold</li>
                        <li className="w3-padding-16"><b>25GB</b> Storage</li>
                        <li className="w3-padding-16"><b>25</b> Emails</li>
                        <li className="w3-padding-16"><b>25</b> Domains</li>
                        <li className="w3-padding-16"><b>Endless</b> Support</li>
                        <li className="w3-padding-16">
                            <h2 className="w3-wide">$ 25</h2>
                            <span className="w3-opacity">per month</span>
                        </li>
                        <li className="w3-light-grey w3-padding-24">
                            <button className="w3-button w3-green w3-padding-large">Sign Up</button>
                        </li>
                    </ul>
                </div>
                <div className="w3-third w3-margin-bottom">
                    <ul class="w3-ul w3-border w3-center w3-hover-shadow">
                        <li class="w3-black w3-xlarge w3-padding-32">Platinum</li>
                        <li class="w3-padding-16"><b>50GB</b> Storage</li>
                        <li class="w3-padding-16"><b>50</b> Emails</li>
                        <li class="w3-padding-16"><b>50</b> Domains</li>
                        <li class="w3-padding-16"><b>Endless</b> Support</li>
                        <li class="w3-padding-16">
                            <h2 class="w3-wide">$ 50</h2>
                            <span class="w3-opacity">per month</span>
                        </li>
                        <li class="w3-light-grey w3-padding-24">
                            <button class="w3-button w3-green w3-padding-large">Sign Up</button>
                        </li>
                    </ul>
                </div>
            </div>
            <Box>
                <Box
                    style={{
                        display: "flex",
                    }}
                >
                    <Box
                        style={{
                            display: "flex",
                            width: "70%",
                            backgroundColor: "#212121",
                            color: "green",
                            paddingBottom: "30px",
                            paddingTop: "30px",
                        }}
                    >
                        <Box style={{marginLeft: "100px"}}>
                            <Typography variant="h5">About</Typography>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "whitesmoke",
                                    paddingTop: "10px",
                                }}
                            >
                                <Typography variant="caption"> Contact Us </Typography>
                                <Typography variant="caption"> About Us </Typography>
                                <Typography variant="caption"> Careers </Typography>
                                <Typography variant="caption">HesabBook Stories </Typography>
                                <Typography variant="caption"> Press </Typography>
                                <Typography variant="caption"> Corporate Information </Typography>
                            </Box>
                        </Box>
                        <Box style={{marginLeft: "90px"}}>
                            <Typography variant="h5">Help</Typography>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "whitesmoke",
                                    paddingTop: "10px",
                                }}
                            >
                                <Typography variant="caption"> Payments </Typography>
                                <Typography variant="caption"> Shipping </Typography>
                                <Typography variant="caption">Cancellation & Returns</Typography>
                                <Typography variant="caption"> FAQ </Typography>
                                <Typography variant="caption"> Report Infringement </Typography>
                            </Box>
                        </Box>
                        <Box style={{marginLeft: "90px"}}>
                            <Typography variant="h5">Policy</Typography>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "whitesmoke",
                                    paddingTop: "10px",
                                }}
                            >
                                <Typography variant="caption"> Return Policy </Typography>
                                <Typography variant="caption"> Terms Of Use </Typography>
                                <Typography variant="caption"> Security </Typography>
                                <Typography variant="caption"> Privacy </Typography>
                                <Typography variant="caption"> Sitemap </Typography>
                                <Typography variant="caption"> EPR Compliance </Typography>
                            </Box>
                        </Box>
                        <Box style={{marginLeft: "90px"}}>
                            <Typography variant="h5">Social</Typography>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "whitesmoke",
                                    paddingTop: "10px",
                                }}
                            >
                                <Typography variant="caption"> Facebook </Typography>
                                <Typography variant="caption"> Instagram </Typography>
                                <Typography variant="caption"> WatsApp </Typography>
                                <Typography variant="caption"> Telegram </Typography>
                                <Typography variant="caption"> Twitter </Typography>
                                <Typography variant="caption"> YouTube </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider orientation="vertical"/>
                    <Box
                        style={{
                            display: "flex",
                            width: "30%",
                            backgroundColor: "#212121",
                            color: "green",
                            paddingBottom: "30px",
                            paddingTop: "30px",
                        }}
                    >
                        <Box style={{marginLeft: "100px"}}>
                            <Typography>Registered Office Address</Typography>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "whitesmoke",
                                    paddingTop: "10px",
                                }}
                            >
                                <Typography variant="caption" display="block" gutterBottom>
                                    HesabBook Private Limited,
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    House No-103 ,Ward-24
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    At-Patel Nagar,PO-Phusro
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    PS-Bermo, Dist-Bokaro
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    Jharkhand,829144, India
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider/>
                <Box
                    style={{
                        display: "flex",
                        paddingBottom: "30px",
                        paddingTop: "30px",
                        backgroundColor: "#212121",
                        color: "whitesmoke",
                    }}
                >
                    <Typography style={{marginLeft: "100px"}}>Accounting & Billing</Typography>
                    <Typography style={{marginLeft: "100px"}}>Advertise</Typography>
                    <Typography style={{marginLeft: "100px"}}>Gift Cards</Typography>
                    <Typography style={{marginLeft: "100px"}}>Help Center</Typography>
                    <Typography style={{marginLeft: "100px"}}>Q & A</Typography>
                    <Typography style={{marginLeft: "100px"}}>
                        @2024-HesabBook.com
                    </Typography>
                </Box>
            </Box>

            { /*
            Drawer open
            */

            }
            <Transition in={open} timeout={400}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Box sx={style}>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <ModalClose variant="plain" sx={{m: 1}}/>
                            <Typography component="h1" variant="h5">
                                Login/Registration
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="+91 Enter Your Mobile Number"
                                    name="phone"
                                    autoComplete="phone"
                                    value={phone}
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="Temporary Password"
                                    name="tempPassword"
                                    autoComplete="tempPassword"
                                    value={otpPassword}
                                    autoFocus
                                    disabled={true}
                                />
                                <a
                                    href={require('../../file/software.msi')}
                                    download="software.msi"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={handleClick}
                                        sx={{mt: 3, mb: 2, color: "whitesmoke", background: '#212121'}}
                                    >
                                        Submit
                                    </Button>
                                </a>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </Transition>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openPassword}
                onClose={handleOtpPassword}
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{m: 1}}/>
                    <Typography></Typography>
                    <br/>
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h2"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={2}
                    >
                        This is the temporary Password. Please save need for login.
                    </Typography><br/>
                    <Typography id="modal-desc" textColor="text.tertiary" sx={{textAlign: 'center'}} variant="h1"
                                component="h2">
                        {otpPassword}
                    </Typography>
                </Sheet>
            </Modal>
        </>
    )


}


function generateRandomAlphaNumeric(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}