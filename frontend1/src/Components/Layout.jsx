import { Box, Flex} from '@chakra-ui/react';
import EditorPage from './EditorPage';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Box
        width="100%"
      >
       <Navbar />
       <EditorPage />
       <Footer />
      </Box>
    </>
  );
}

export default Layout;
