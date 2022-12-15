
import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
// import { ThemeProvider } from '@material-ui/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { ContentPasteSearchOutlined } from '@mui/icons-material';
import { useNavigate } from "react-router-dom"



// import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
const unique_id = uuid();
console.log(sessionStorage.getItem('id'))
if (sessionStorage.getItem('id') == null) {
  sessionStorage.setItem("id", unique_id);
}

export default function App() {
  const [name, setName] = React.useState(sessionStorage.getItem('name'))
  const [selector, setSelector] = React.useState(sessionStorage.getItem('selector'))
  const [terms, setTerms] = React.useState(sessionStorage.getItem('terms'))
  const [error, setError] = React.useState(0)
  const [success, setSuccess] = React.useState(0)
  const [data, setData] = React.useState([])
  const [id, setId] = React.useState(sessionStorage.getItem('id'))
  console.log(sessionStorage);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      selector: data.get('selector'),
      terms: data.get('terms')
    });

    if (data.get('name') == "" || data.get('selector') == "" || data.get('terms') == null) {

      return setError(1)
    }


    sessionStorage.setItem("name", data.get('name'));
    sessionStorage.setItem("selector", data.get('selector'));
    sessionStorage.setItem("terms", data.get('terms') ? 1 : 0)
    setName(sessionStorage.getItem('name'))
    setSelector(sessionStorage.getItem('selector'))
    setTerms(sessionStorage.getItem('terms'))

    const url = "https://coding-challenge.onrender.com/api/user/store";
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: data.get('name'),
        selector: data.get('selector'),
        terms: data.get('terms'),
        unique_id: sessionStorage.getItem('id')
      }),
    };
    console.log(options)
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSuccess(1)
        // setUserSession(data.token, data.user.username);
        // window.location.reload();
        // navigate('../profile')
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSelector(event.target.value)
    console.log(selector)
  }

  const handleTextChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }
  const handleTermsChange = (event) => {
    // event.preventDefault();
    event.target.checked ? setTerms(1) : setTerms(0)
  }

  React.useEffect(() => {
    fetch('https://coding-challenge.onrender.com/api/user/selector')
      .then(response => response.json())
      .then(data => {
        setData(data.data)
      })
  }, [])
  const navigate = useNavigate()

  const navigateTo = () => navigate(`/table`)


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {error ? <p sx={{ color: '#FF0000' }}>Filling all the field is mandatory</p> : ''}
          {success ? <p sx={{ color: '#FF0000' }}>Data Updated Successfully</p> : ''}
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  {/* <InputLabel htmlFor="grouped-native-select">Selectors:</InputLabel> */}
                  <Select native defaultValue={selector} id="grouped-native-select" label="Grouping" name='selector' >
                    {selector &&
                      <option value={selector}>{selector}</option>
                    }
                    {
                      !selector &&
                      <option value="">Select the Service</option>
                    }

                    {data.map(item => (
                      <optgroup label={item.name}>
                        {(item.sub).map(item =>
                          (<option value={item.name}>{item.name}</option>)
                        )}
                      </optgroup>

                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value={terms} checked={terms} color="primary" name="terms" onChange={handleTermsChange} />}
                  label="I agree to the Terms"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
            <Button onClick={navigateTo}>Go to Table Page</Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}