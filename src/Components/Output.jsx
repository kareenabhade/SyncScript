import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      toast({
        title: "No code to run.",
        description: "Please enter some code to execute.",
        status: "warning",
        duration: 6000,
      });
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false); // Reset error state before running

      // Call the executeCode function
      const result = await executeCode(language, sourceCode);

      // Assuming result contains a structure that includes "run" and "stderr"
      const { run, stderr } = result;

      // Update the output and error state based on the result
      if (stderr) {
        setIsError(true);
        setOutput(stderr.split("\n")); // Display error output
      } else {
        setOutput(run.output.split("\n")); // Display normal output
      }
    } catch (error) {
      console.error("Execution Error:", error);
      setIsError(true);
      setOutput(["Execution failed."]);

      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code.",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : "inherit"}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
