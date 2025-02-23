import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Button,
    FormControl,
    FormErrorMessage,
    Icon,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Text,
    useBoolean,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import Logo from "/assets/images/fastapi-logo.svg";
import type { Body_login_login_access_token as AccessToken } from "../../client";
import useAuth from "../../hooks/useAuth";
import { emailPattern } from "../../utils/utils";

export const LoginForm = ({ onClose }: { onClose: () => void }) => {
    const [show, setShow] = useBoolean();
    const { loginMutation, error, resetError } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AccessToken>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<AccessToken> = async (data) => {
        if (isSubmitting) return;

        resetError();

        try {
            await loginMutation.mutateAsync(data);
            onClose(); // Close the modal on successful login
        } catch {
            // error is handled by useAuth hook
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Image
                src={Logo}
                alt="FastAPI logo"
                height="auto"
                maxW="2xs"
                alignSelf="center"
                mb={4}
            />
            <FormControl id="username" isInvalid={!!errors.username || !!error}>
                <Input
                    id="username"
                    {...register("username", {
                        required: "Username is required",
                        pattern: emailPattern,
                    })}
                    placeholder="Email"
                    type="email"
                    required
                />
                {errors.username && (
                    <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl id="password" isInvalid={!!error}>
                <InputGroup>
                    <Input
                        {...register("password", {
                            required: "Password is required",
                        })}
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        required
                    />
                    <InputRightElement
                        color="ui.dim"
                        _hover={{
                            cursor: "pointer",
                        }}
                    >
                        <Icon
                            as={show ? ViewOffIcon : ViewIcon}
                            onClick={setShow.toggle}
                            aria-label={show ? "Hide password" : "Show password"}
                        >
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                        </Icon>
                    </InputRightElement>
                </InputGroup>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
            <Link as={RouterLink} to="/accounts/recover-password" color="blue.500">
                Forgot password?
            </Link>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
                Log In
            </Button>
            <Text>
                Don't have an account?{" "}
                <Link as={RouterLink} to="/accounts/signup" color="blue.500">
                    Sign up
                </Link>
            </Text>
        </form>
    );
};