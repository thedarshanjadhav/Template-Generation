import { useState } from 'react';
import axios from 'axios';
import { Button, Flex, VStack, Box, Show } from '@chakra-ui/react';
import '../../assets/css/style.css';
import Notification from '../../components/Notification/Notification';

export default function AdminPanel() {
    const initialFormData = { 
        metaDescription:'',
        metaKeywords:'',
        navbarName: '', 
        navbarAlt:'',
        title: '',
        bannerImages:null, 
        bannerAlt:'',
        projectName:'',
        location:'',
        landArea:'',
        residencies:'',
        amenitiesHighlight:'',
        highlighter1:'',
        highlighter2:"",
        highlighter3:'',
        onwards:'',
        overview:'',
        primaryColor:'',
        secondaryColor:'', 
        contact:'',
        template: 'template1',
        amenities: '', 
        galleryImages: null,
        galleryImagesAlt:'', 
        typeAndCarpetArea: [{ type: '', carpetArea: '', price:'' }], 
        floorPlanImg: null,
        floorImgEffect:'no-blur',
        floorPlan: '',
        floorPlanAlt:'',
        titleIcon: null, 
        navbarLogo: null,
        mapIframe:'',
        mapNearby:'',
        reraImg: null,
        reraAlt:'', 
        reraNo:''
    };
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
     
        if (name === 'galleryImages' || name === 'floorPlanImg' || name === 'titleIcon' || name === 'navbarLogo' || name === 'bannerImages' || name === 'reraImg') {
            setFormData({ ...formData, [name]: files }); // Update state for files
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
    
    // validation function for contact
    const validateContactNumber = (contact) => {
        const regex = /^[6789]\d{9}$/; // Regular expression for Indian phone numbers
        return regex.test(contact);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // error msg for contact
        if (!validateContactNumber(formData.contact)) {
            setErrorMessage('Please enter a valid Indian contact number.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            // Append existing form data
            formDataToSend.append('metaDescription', formData.metaDescription);
            formDataToSend.append('metaKeywords', formData.metaKeywords);
            formDataToSend.append('navbarName', formData.navbarName);
            formDataToSend.append("navbarAlt", formData.navbarAlt)
            formDataToSend.append('title', formData.title);
            formDataToSend.append('bannerAlt', formData.bannerAlt);
            formDataToSend.append('projectName', formData.projectName);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('landArea', formData.landArea);
            formDataToSend.append('residencies', formData.residencies);
            formDataToSend.append('amenitiesHighlight', formData.amenitiesHighlight);
            formDataToSend.append('highlighter1', formData.highlighter1);
            formDataToSend.append('highlighter2', formData.highlighter2);
            formDataToSend.append('highlighter3', formData.highlighter3);
            formDataToSend.append('onwards', formData.onwards);
            formDataToSend.append('overview', formData.overview);
            formDataToSend.append('primaryColor', formData.primaryColor);
            formDataToSend.append('secondaryColor', formData.secondaryColor);
            formDataToSend.append('contact', formData.contact);
            formDataToSend.append('template', formData.template);
            formDataToSend.append('amenities', formData.amenities);
            formDataToSend.append('floorPlan', formData.floorPlan);
            formDataToSend.append("floorImgEffect", formData.floorImgEffect)
            formDataToSend.append('floorPlanAlt', formData.floorPlanAlt);
            formDataToSend.append('galleryImagesAlt', formData.galleryImagesAlt);
            formDataToSend.append('mapIframe', formData.mapIframe);
            formDataToSend.append('mapNearby', formData.mapNearby);
            formDataToSend.append('reraAlt', formData.reraAlt);
            formDataToSend.append('reraNo', formData.reraNo);

            if (formData.galleryImages) {
                for (const img of formData.galleryImages) {
                    formDataToSend.append('galleryImages', img);
                }
            }

            if (formData.bannerImages) {
                for (const img of formData.bannerImages) {
                    formDataToSend.append('bannerImages', img);
                }
            }

            // Append type and carpet area data
            formData.typeAndCarpetArea.forEach((entry, index) => {
                formDataToSend.append(`typeAndCarpetArea[${index}][type]`, entry.type);
                formDataToSend.append(`typeAndCarpetArea[${index}][carpetArea]`, entry.carpetArea);
                formDataToSend.append(`typeAndCarpetArea[${index}][price]`, entry.price);
                console.log(entry.price);
            });

            if(formData.floorPlanImg){
                for(const img of formData.floorPlanImg){
                    formDataToSend.append("floorPlanImg", img);
                }
            }

            // Append titleIcon and navbarLogo files
            if (formData.titleIcon) {
                formDataToSend.append('titleIcon', formData.titleIcon[0]);
            }

            if (formData.navbarLogo) {
                formDataToSend.append('navbarLogo', formData.navbarLogo[0]);
            }

            // Append reraImg file
            if (formData.reraImg) {
                formDataToSend.append('reraImg', formData.reraImg[0]);
            }

            const response = await axios.post('http://localhost:3001/generate-template', formDataToSend, {
                responseType: 'blob',
            });
            
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${formData.navbarName}-${formData.template}-portfolio-template.zip`);

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setSuccessMessage('Template successfully created!');
            setIsLoading(false);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
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
            {/* Notification for success */}
            {successMessage && <Notification message={successMessage} status="success" />}

            {/* Notification for error */}
            {errorMessage && <Notification message={errorMessage} status="error" />}

            <Show above='sm'>
            <VStack w="100%">
                <form onSubmit={handleSubmit}>
                    <VStack gap={2} border="2px solid black" padding="10px">
                       
                        {/* head part */}
                        <Box className='box'>
                            <h1>Head</h1>
                           <VStack gap={3}>
                                {/* first row */}
                                <Flex gap={4}>
                                    <VStack>
                                        <label>Title</label>
                                        <input name="title" type="text" value={formData.title} required onChange={handleChange} />
                                    </VStack>
                                    <VStack>
                                        <label>Title Icon</label>
                                        <input name="titleIcon" type="file" required onChange={handleChange}/>
                                    </VStack>
                                </Flex>
                           

                                {/* second row */}
                                <Flex gap={4}>
                                    <VStack >
                                        <label>Meta Desciption</label>
                                        <textarea name="metaDescription" value={formData.metaDescription} required onChange={handleChange}></textarea>
                                    </VStack>
                                    <VStack>
                                        <label>Meta Keyword</label>
                                        <textarea name="metaKeywords" value={formData.metaKeywords} required onChange={handleChange}></textarea>
                                    </VStack>
                                </Flex>
                            </VStack>
                        </Box>

                        {/* NavBar */}
                        <Box className='box'>
                            <h1>NavBar</h1>
                           <VStack gap={3}>
                                {/* first row */}
                                <Flex gap={4} style={{alignSelf:'self-start'}}>
                                    <VStack w={'100%'}>
                                        <label>NavBar Logo</label>
                                        <input name="navbarLogo" type="file" required onChange={handleChange} style={{width:'100%'}}/>
                                    </VStack>
                                </Flex>
                           

                                {/* second row */}
                                <Flex gap={4}>
                                <VStack>
                                        <label>NavBar Name</label>
                                        <input name="navbarName" type="text" value={formData.navbarName} required onChange={handleChange}/>
                                    </VStack>
                                    <VStack>
                                        <label>NavBar alt</label>
                                        <input name="navbarAlt" type="text" value={formData.navbarAlt} required onChange={handleChange}/>
                                    </VStack>
                                </Flex>
                            </VStack>
                        </Box>

                    

                        {/* Banner */}
                        <Box className='box'>
                            <h1>Banner</h1>
                            <VStack>
                                {/* row 1 */}
                                <Flex gap={4}>
                                    <VStack>
                                        <label>Banner Image</label>
                                        <input name='bannerImages' type="file" multiple required onChange={handleChange}/>
                                        <p style={{fontSize:'12px'}}>Note: choose multiple pic</p>
                                    </VStack>
                                    <VStack>
                                        <label htmlFor="">Banner Alt</label>
                                        <textarea name="bannerAlt" value={formData.bannerAlt} required onChange={handleChange}></textarea>
                                    </VStack>
                                </Flex>

                                {/* row 2 */}
                                <Flex gap={4}>
                                    <VStack>
                                        <label htmlFor="">Project Name</label>
                                        <input name="projectName" value={formData.projectName} type="text" required onChange={handleChange}/>
                                    </VStack>
                                    <VStack>
                                        <label htmlFor="">Location</label>
                                        <input name="location" value={formData.location} type="text" required onChange={handleChange}/>
                                    </VStack>
                                </Flex>
                                
                                {/* row 3 */}
                                <Flex gap={4}>
                                    <VStack>
                                        <label htmlFor="">Land Area</label>
                                        <input name="landArea" value={formData.landArea} type="text" required onChange={handleChange}/>
                                    </VStack>
                                    <VStack>
                                        <label htmlFor="">Residencies</label>
                                        <input name="residencies" value={formData.residencies} type="text" required onChange={handleChange}/>
                                    </VStack>
                                </Flex>

                                {/* row 4 */}
                                <Flex gap={4}>
                                    <VStack>
                                        <label htmlFor="">Amenities</label>
                                        <input name="amenitiesHighlight" value={formData.amenitiesHighlight} type="text" required onChange={handleChange}/>
                                    </VStack>
                                    <VStack>
                                        <label htmlFor="">Highlighter1</label>
                                        <input name="highlighter1" value={formData.highlighter1} type="text" required onChange={handleChange}/>
                                    </VStack>
                                </Flex>

                                {/* row 5 */}
                                <Flex gap={4}>
                                    <VStack>
                                        <label htmlFor="">Highlighter2</label>
                                        <input name="highlighter2" value={formData.highlighter2} type="text" required onChange={handleChange}/>
                                    </VStack>
                                    <VStack>
                                        <label htmlFor="">Highlighter3</label>
                                        <input name="highlighter3" value={formData.highlighter3} type="text" required onChange={handleChange}/>
                                    </VStack>
                                </Flex>

                                {/* row 6 */}
                                <Flex gap={4} w='100%'>
                                    <VStack>
                                        <label>Onwards</label>
                                        <textarea name="onwards" cols={54} rows={3} style={{width:'100%', height:'50px'}} required onChange={handleChange}></textarea>
                                    </VStack>
                                </Flex>
                                {/* row 7 */}
                                <Flex gap={4} w='100%'>
                                    <VStack>
                                        <label>Overview</label>
                                        <textarea name="overview" cols={54} rows={3} style={{width:'100%', height:'50px'}} required onChange={handleChange}></textarea>
                                    </VStack>
                                </Flex>
                            </VStack>
                        </Box>    

                        {/*  Price */}
                        <Box className='box'>
                            <h1>Price</h1>
                            <VStack> 
                                {formData.typeAndCarpetArea.map((entry, index) => (
                                <div key={index}>
                                <Flex gap={4} pb={'8px'}>
                                    <VStack>
                                    <label>Type</label>
                                    <input
                                        type="text"
                                        value={entry.type}
                                        required
                                        onChange={(e) => handleTypeAndCarpetAreaChange(index, 'type', e.target.value)}
                                    />
                                    </VStack>
                                    <VStack>
                                    <label>Carpet Area</label>
                                    <input
                                        type="text"
                                        value={entry.carpetArea}
                                        required
                                        onChange={(e) => handleTypeAndCarpetAreaChange(index, 'carpetArea', e.target.value)}
                                    />
                                    </VStack>
                                </Flex>
                                <VStack>
                                    <label>Price</label>
                                    <input
                                        type="text"
                                        value={entry.price}
                                        style={{alignSelf:'start'}}
                                        onChange={(e) => handleTypeAndCarpetAreaChange(index, 'price', e.target.value)}
                                    />
                                </VStack>
                            
                                <button type="button" onClick={() => removeTypeAndCarpetAreaRow(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addTypeAndCarpetAreaRow}>Add Row</button>
                            </VStack>
                        </Box>   

                        {/* Floor Plan */}
                        <Box className='box'>
                            <h1>Floor Plan</h1>
                            <VStack gap={3}>
                                {/* first row */}
                                <Flex gap={4} style={{alignSelf:'self-start'}}>
                                    <VStack w={'100%'}>
                                        <label>Floor Plan image</label>
                                        <input
                                            name='floorPlanImg'
                                            type="file"
                                            multiple
                                            required
                                            onChange={handleChange}
                                        />
                                    </VStack>
                                    <VStack w={'100%'}>
                                        <label>Image effect</label>
                                        <select name="floorImgEffect" value={formData.floorImgEffect} style={{width:'100px'}} onChange={handleChange}>
                                            <option value="no-blur">no blur</option>
                                            <option value="blur">blur</option>
                                        </select>
                                    </VStack>

                                </Flex>

                                {/* second row */}
                                <Flex gap={4}>
                                    <VStack>
                                        <label>Floor plan</label>
                                        <textarea name="floorPlan" value={formData.floorPlan} required onChange={handleChange} />
                                    </VStack>
                                    <VStack>
                                        <label>Floor Plan alt</label>
                                        <textarea name="floorPlanAlt" value={formData.floorPlanAlt} required onChange={handleChange} />
                                    </VStack>
                                    
                                </Flex>
                            ;   
                            </VStack>
                        </Box>

                        {/* Gallery */}
                        <Box className='box'>
                            <h1>Gallery</h1>
                            <VStack>
                                <Flex gap={4}>
                                    <VStack>
                                    <label>Gallery Images</label>
                                    <input name="galleryImages" type="file" multiple required onChange={handleChange} />
                                    </VStack>
                                    <VStack>
                                        <label>Gallery Alt</label>
                                        <textarea name="galleryImagesAlt" value={formData.galleryImagesAlt} required onChange={handleChange}></textarea>
                                    </VStack>
                                </Flex>
                            </VStack>
                        </Box>

                        {/* Amenities */}
                        <Box className='box' style={{width:'100%'}}>
                            <h1>Aminities</h1>
                            <VStack>
                                <label>Amenities</label>
                                <textarea name="amenities" value={formData.amenities} required onChange={handleChange} style={{width:'100%'}}></textarea>
                                <Flex gap={2}>
                            
                        </Flex>
                            </VStack>
                        </Box>

                        {/* Map */}
                        <Box className='box' style={{width:'100%'}}>
                            <h1>Map</h1>
                            <VStack>
                                <Flex gap={4}>
                                    <VStack>
                                    <label>Map Iframe</label>
                                    <input name="mapIframe" type="text" value={formData.mapIframe} required onChange={handleChange} />
                                    </VStack>
                                    <VStack>
                                        <label>Map Nearby </label>
                                        <textarea name="mapNearby" value={formData.mapNearby} required onChange={handleChange}></textarea>
                                    </VStack>
                                </Flex>
                            </VStack>
                        </Box>

                        {/* Rera */}
                        <Box className='box' style={{width:'100%'}}>
                            <h1>Rera</h1>
                            <VStack>
                                <Flex style={{alignSelf:'self-start'}}>
                                    <VStack w={'100%'}>
                                        <label>Rera image</label>
                                        <input
                                            name='reraImg'
                                            type="file"
                                            multiple
                                            onChange={handleChange}
                                            style={{width: "100%"}}
                                        />
                                    </VStack>
                                </Flex>
                                <Flex gap={4}>
                                    <VStack>
                                        <label>Rera No.</label>
                                        <input name="reraNo" type="text" value={formData.reraNo} required onChange={handleChange} />
                                    </VStack>

                                    <VStack>
                                        <label>Rera alt</label>
                                        <input name="reraAlt" type="text" value={formData.reraAlt} onChange={handleChange} />
                                    </VStack>
                                </Flex>
                            </VStack>
                        </Box>
                        <Box className='box'>
                            <h1>Theme</h1>
                            <Flex gap={4}>
                                <VStack>
                                    <label>Primary Color</label>
                                    <input name="primaryColor" type="text" value={formData.primaryColor} required onChange={handleChange} />
                                </VStack>

                                <VStack>
                                    <label>Secondary Color</label>
                                    <input name="secondaryColor" type="text" value={formData.secondaryColor} required onChange={handleChange} />
                                </VStack>
                            </Flex>
                        </Box>

                        <Box className='box'>
                            <h1>Contact No</h1>
                            <Flex gap={4}>
                                <VStack>
                                    <label>SM Contact</label>
                                    <input name="contact" type="number" value={formData.contact} required onChange={handleChange} />
                                </VStack>
                    
                            </Flex>
                        </Box>

                        {/* Template */}
                       <Box className='box'>
                            <h1>Templates</h1>
                            <VStack>
                                <label>Please choose the Template</label>
                                <select name="template" value={formData.template} style={{width:'100%'}} onChange={handleChange}>
                                    <option value="template1">Template 1</option>
                                </select>
                            </VStack>
                       </Box>

                        <Button 
                        style={{
                            backgroundColor:'#00482E', 
                            color:'white', 
                            transition: 'background-color 0.3s ease', 
                            _hover: {
                                backgroundColor: '#2d6b54',
                            }
                        }} 
                        type="submit" isLoading={isLoading}>
                            Generate Template
                        </Button>

                    </VStack>
                </form>
            </VStack>
            </Show>
        </>
    );
}
