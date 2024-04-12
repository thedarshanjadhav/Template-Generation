import { useState } from 'react';
import axios from 'axios';
import { Button, Flex, Select, VStack, Alert, AlertIcon, Text } from '@chakra-ui/react';

export default function AdminPanel() {
    const initialFormData = { 
        name: '', 
        title: '', 
        pColor:'',
        sColor:'', 
        template: 'template1',
        amenities: '', 
        image1: null,
        image2: null,
        galleryImages: null, 
        typeAndCarpetArea: [{ type: '', carpetArea: '' }], 
        floorPlanImg: null,
        floorPlan: ''
    };
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name.startsWith('image')) {
            setFormData({ ...formData, [name]: files[0] });
        } else if (name === 'galleryImages') {
            setFormData({ ...formData, [name]: files });
        } else if(name === "floorPlanImg"){
            setFormData({ ...formData, [name]: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleTypeAndCarpetAreaChange = (index, key, value) => {
        const updatedTypeAndCarpetArea = [...formData.typeAndCarpetArea];
        updatedTypeAndCarpetArea[index][key] = value;
        setFormData({ ...formData, typeAndCarpetArea: updatedTypeAndCarpetArea });
    };

    const addTypeAndCarpetAreaRow = () => {
        setFormData({
            ...formData,
            typeAndCarpetArea: [...formData.typeAndCarpetArea, { type: '', carpetArea: '' }]
        });
    };

    const removeTypeAndCarpetAreaRow = (index) => {
        const updatedTypeAndCarpetArea = [...formData.typeAndCarpetArea];
        updatedTypeAndCarpetArea.splice(index, 1);
        setFormData({ ...formData, typeAndCarpetArea: updatedTypeAndCarpetArea });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            // Append existing form data
            formDataToSend.append('name', formData.name);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('pColor', formData.pColor);
            formDataToSend.append('sColor', formData.sColor);
            formDataToSend.append('template', formData.template);
            formDataToSend.append('amenities', formData.amenities);
            formDataToSend.append('floorPlan', formData.floorPlan);
            formDataToSend.append('image1', formData.image1);
            formDataToSend.append('image2', formData.image2);
            if (formData.galleryImages) {
                for (const img of formData.galleryImages) {
                    formDataToSend.append('galleryImages', img);
                }
            }
            // Append type and carpet area data
            formData.typeAndCarpetArea.forEach((entry, index) => {
                formDataToSend.append(`typeAndCarpetArea[${index}][type]`, entry.type);
                formDataToSend.append(`typeAndCarpetArea[${index}][carpetArea]`, entry.carpetArea);
            });

            if(formData.floorPlanImg){
                for(const img of formData.floorPlanImg){
                    formDataToSend.append("floorPlanImg", img);
                }
            }

            console.log(formData);

            // const response = await axios.post('http://localhost:3001/generate-template', formDataToSend, {
            //     responseType: 'blob',
            // });
            const response = await axios.post('https://template-generation.onrender.com/generate-template', formDataToSend, {
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
                            <label>Amenities</label>
                            <textarea name="amenities" value={formData.amenities} required onChange={handleChange} />
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
                            <label>Gallery Images</label>
                            <input name="galleryImages" type="file" multiple onChange={handleChange} />
                        </Flex>

                        <VStack border='2px solid black'>
                            <Text>Price carpetarea</Text>
                        {/* Render type and carpet area inputs */}
                        {formData.typeAndCarpetArea.map((entry, index) => (
                            <div key={index}>
                                <Flex gap={2}>
                                    <label>Type</label>
                                    <input
                                        type="text"
                                        value={entry.type}
                                        onChange={(e) => handleTypeAndCarpetAreaChange(index, 'type', e.target.value)}
                                    />
                                </Flex>
                                <Flex gap={2}>
                                    <label>Carpet Area</label>
                                    <input
                                        type="text"
                                        value={entry.carpetArea}
                                        onChange={(e) => handleTypeAndCarpetAreaChange(index, 'carpetArea', e.target.value)}
                                    />
                                </Flex>
                                <button type="button" onClick={() => removeTypeAndCarpetAreaRow(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addTypeAndCarpetAreaRow}>Add Row</button>
                        </VStack>  

                        <VStack border='2px solid black'>
                            <Text>Floor plan</Text>
                            <Flex gap={2}>
                                <label>Floor Plan image</label>
                                <input
                                    name='floorPlanImg'
                                    type="file"
                                    multiple
                                    onChange={handleChange}
                                />
                            </Flex>

                            <Flex gap={2}>
                                <label>Floor plan</label>
                                <textarea name="floorPlan" value={formData.floorPlan} required onChange={handleChange} />
                            </Flex>
                        
                        </VStack>    

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
