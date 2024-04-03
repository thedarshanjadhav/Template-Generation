import { useState } from 'react';
import axios from 'axios';
import { Button, Flex, Select, VStack, Alert, AlertIcon } from '@chakra-ui/react';

export default function AdminPanel() {
    const initialFormData = { 
        name: '', 
        title: '', 
        pColor:'',
        sColor:'', 
        template: 'template1',
        image1: null,
        image2: null,
    };
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name.startsWith('image')) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('pColor', formData.pColor);
            formDataToSend.append('sColor', formData.sColor);
            formDataToSend.append('template', formData.template);
            formDataToSend.append('image1', formData.image1);
            formDataToSend.append('image2', formData.image2);

            const response = await axios.post('http://localhost:3001/generate-template', formDataToSend, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${formData.name}-${formData.template}-portfolio-template.zip`);

            document.body.appendChild(link);
            link.click();

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
                            <label>Title</label>
                            <input name="title" type="text" value={formData.title} required onChange={handleChange} />
                        </Flex>
                        <Flex gap={2}>
                            <label>pColor</label>
                            <input name="pColor" type="text" value={formData.pColor} required onChange={handleChange} />
                        </Flex>
                        <Flex gap={2}>
                            <label>sColor</label>
                            <input name="sColor" type="text" value={formData.sColor} required onChange={handleChange} />
                        </Flex>
                        <Flex gap={2}>
                            <label>Image 1</label>
                            <input name="image1" type="file" required onChange={handleChange} />
                        </Flex>
                        <Flex gap={2}>
                            <label>Image 2</label>
                            <input name="image2" type="file" required onChange={handleChange} />
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
