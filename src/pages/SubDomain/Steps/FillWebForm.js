import {
  Container,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetWebformDetailsQuery } from "../../../redux/services/settings/WebformService";

function FillWebForm() {
  const { webform } = useParams();
  const { data: webformData } = useGetWebformDetailsQuery(+webform)
  console.log(webformData)
  return (
    <Container className='ApplicationSteps'
      sx={{
        display:"flex", 
        justifyContent: "flex-start", 
        flexDirection: "column", 
        textAlign: "left",
        gap: "2rem"
      }}
    >
      <Typography variant='h4'>{webformData?.data?.name}</Typography>
      <Container>
        {webformData?.data?.form?.map((e, i) => (
          <Container key={i}>
            <Divider flexItem textAlign='left' absolute>{e.name}</Divider>
            <Container>
              {e.fields?.map((elem, j) => (
                <TextField
                  label={elem.name}
                  placeholder={elem.name}
                  key={i}
                />
              ))}
            </Container>
            {/* <TextField 
              pattern="search"
              label={}
            /> */}
          </Container>
        ))}
      </Container>
    </Container>
  )
}

export default FillWebForm