import React,{useEffect} from "react";
import { Box, 
         Flex, 
         VStack, 
         Heading, 
         Text, 
         Image,
         Button,
         Highlight
         } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import laptopImg from "./Images/laptop1.png"
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "./Context/UserContext";


const HomePage = () => {
  const navigate = useNavigate();
  const {user, loginWithRedirect, isAuthenticated,logout  } = useAuth0();
  const { setUser } = useUser();

  const saveUserToBackend = async (user) => {
  try {
    const response = await fetch("http://localhost:5000/api/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.given_name,
        email: user.email,
        picture: user.picture,
      }),
    });

     const data = await response.json();

     //console.log("Response", data)
     setUser(data.user)

  } catch (error) {
    console.error("Error saving user:", error);
  }
};


   console.log("User", user)

  useEffect(() => {
    if (isAuthenticated) {
      saveUserToBackend(user);
      setUser(user);
      navigate("/sync");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Box  width="100%" height="100vh" style={{padding:"0px 100px"}}>

        <Box style={{display:"flex", justifyContent:"space-between"}}>
        <Heading size="xl" letterSpacing="tight" fontWeight="bold" color="#F2F9FF"
                 p={5} pl="30px" >
          <Highlight query="Script" styles={{ color: "#0D92F4" }}>
          Sync-Script
          </Highlight>
           <Highlight query="</>" styles={{ color: "#F2F9FF" }}>
             {" </>"}
           </Highlight>
        </Heading>

        { (isAuthenticated)?
        <Button p={5} mt={5} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
            <FaArrowRightLong style={{ marginLeft: "8px" }} />
        </Button>:<></>
        }
        
        </Box>

      <Flex>
        <Box width="50%" height="80vh" >
          <Heading width="80%" size="2xl"  fontWeight="semibold" color="#F2F9FF"
                   pl="30px" mt="200px"
           >
            <Highlight query="Perfect Code" styles={{ color: "#48CFCB" }} >
            Teamwork: The Secret Sauce for Perfect Code.
            </Highlight>
          </Heading>
          <Heading width="80%" size="lg" letterSpacing="tight" fontWeight="semibold" color="#EEF7FF"
                   pl="30px" mt="50px"
           >
            Write Better Code, Together...
          </Heading>
          <Button  ml="30px" mt="50px"
                  onClick={() => loginWithRedirect()}
          >
            Start Collaboration   
            <FaArrowRightLong style={{ marginLeft: "8px" }} />
          </Button>
         

        </Box>

        <Box width="50%" >
          <div style={{margin:"100px 0px 0px 200px"}}>
          <img src={laptopImg} style={{ width: "1000px", height: "auto" }} />
          </div>
        </Box>
      </Flex> 
     

      </Box>
    </>
  );
};

export default HomePage;
