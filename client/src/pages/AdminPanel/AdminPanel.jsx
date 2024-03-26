import { useState } from 'react';
import axios from 'axios';
import { Button, Flex, Select, VStack, Alert, AlertIcon } from '@chakra-ui/react';

export default function AdminPanel() {
    const initialFormData = { name: '', template: 'template1' };
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/generate-template', formData, {
                responseType: 'blob', // Set response type to blob
            });

            // Create a blob object from the response data
            const blob = new Blob([response.data]);

            // Create a temporary URL for the blob object
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${formData.name}-${formData.template}-portfolio-template.zip`);

            // Trigger a click event on the link to initiate download
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the link and revoking the URL object
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setSuccessMessage('Template successfully created!');
            setIsLoading(false);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            setFormData(initialFormData);
        } catch (error) {
            setErrorMessage('Error generating template. Please try again.');
            setIsLoading(false);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <>
            <h1>This is Admin panel</h1>
            {successMessage && (
                <Alert status="success">
                    <AlertIcon />
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert status="error">
                    <AlertIcon />
                    {errorMessage}
                </Alert>
            )}
            <VStack w="100%">
                <form onSubmit={handleSubmit}>
                    <VStack gap={2} border="2px solid black" padding="10px">
                        <Flex gap={2}>
                            <label>Name</label>
                            <input name="name" type="text" value={formData.name} required onChange={handleChange} />
                        </Flex>
                        <Flex gap={2}>
                            <label>Template</label>
                            <Select name="template" value={formData.template} onChange={handleChange}>
                                <option value="template1">Template 1</option>
                                <option value="template2">Template 2</option>
                            </Select>
                        </Flex>
                        <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                            Generate Template
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </>
    );
}
