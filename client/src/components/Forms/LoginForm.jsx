import {  useState } from "react";
import { Flex, VStack, Button } from "@chakra-ui/react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAuthData } from "../../features/auth/authSlice";

// eslint-disable-next-line react/prop-types
const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { auth } = useSelector((state) => state.auth);
    // console.log({auth})

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(fetchAuthData({ email, password }));
            console.log(auth);
    
            // Check if auth object exists and has a 'success' property
            if (auth && auth.success) {
                navigate('/admin-panel');
                console.log(auth.message);
                alert(auth.message);
            } else {
                console.log(auth.message);
                alert(auth.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <VStack w="100%">
            <form onSubmit={handleSubmit}>
                <VStack gap={2} border="2px solid black" padding="10px">
                    <Flex gap={2}>
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </Flex>
                    <Flex gap={2}>
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Flex>
                    <Button type="submit" colorScheme="blue">
                        Login
                    </Button>
                </VStack>
            </form>
        </VStack>
    );
};

export default LoginForm;
