import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { THEME } from '../theme';
import { IAuthResult, IUserFormValues } from '../app/models/models';
import { ErrorToast } from '../app/common/components/AppToast';
import { User } from '../app/services/agent';
import { useDispatch } from 'react-redux';
import { setToken  } from '../features/auth/authReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

interface IError {
    auth?: string;
}

export default function LoginScreen(
    { navigation } : { navigation: StackNavigationProp<ParamListBase> }
) {
    const dispatch = useDispatch();
    return (
        <View style={styles.viewRoot}>
            <Text style={styles.title}>Welcom</Text>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required().min(6).max(10)
                })}

                onSubmit={async (values: IUserFormValues & IError, { setSubmitting, setErrors }) => {
                    console.log("[Formik Login Submit] values", values);
                    try {
                        const result: IAuthResult = await User.login(values);
                        console.log('login', result);        
                        
                        await AsyncStorage.setItem('id_token', result.id_token!);
                        dispatch(setToken(result.id_token!));
                        setSubmitting(false); // ?
                        navigation.navigate("BottomTab");
                    } catch (error) {
                        if (error.data && error.data.error) {
                            setErrors({ auth: error.data.error });
                            ErrorToast(error.data.error);
                        }
                        console.log('[Formik/submit/login/error]', JSON.stringify(error, null, 4));
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    handleChange, handleBlur, handleSubmit, isSubmitting, isValid, dirty, errors, values, touched
                }) => {
                    const isDisabledSubmit = !isValid || !dirty || isSubmitting;
                    return (
                        <View>
                            <TextInput
                                style={styles.element}
                                label="Email"
                                placeholder="Username or email address"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {errors.email && touched.email &&
                                <Text style={styles.error}>
                                    {errors.email}
                                </Text>
                            }

                            <TextInput
                                style={styles.element}
                                label="Password"
                                placeholder="Enter password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={true}
                            />
                            {errors.password && touched.password &&
                                <Text style={styles.error}>
                                    {errors.password}
                                </Text>
                            }

                            {errors.auth &&
                                <Text style={{ color: THEME.ERROR_TEXT, textAlign: 'center'}}>
                                    {errors.auth}
                                </Text>
                            }

                            <Button
                                style={[styles.element, styles.button]}
                                mode="contained" 
                                onPress={handleSubmit}
                                disabled={isDisabledSubmit}
                                loading={isSubmitting}
                            >
                                Continue
                            </Button>

                            <View style={[styles.element, styles.rowElements]}>
                                <Text style={styles.text}>Don't have an account?</Text>
                                <Button
                                    style={[styles.element, styles.button, styles.buttonText]}
                                    mode="text"
                                    onPress={() => navigation.navigate("Register")}
                                >
                                    Sign up
                                </Button>
                            </View>

                        </View>
                    );
                }}

            </Formik>

        </View>
    )
}

const styles = StyleSheet.create({
    viewRoot: {
        flex: 1,
        //alignItems: 'center'
        padding: THEME.PADDING_PAGE,
        justifyContent: 'center'
    },
    title: {
        fontSize: THEME.TITLE_BIG,
        textAlign: 'center',
        color: THEME.LIGHT_PRIMARY
    },
    button: {
        //height: THEME.BUTTON_HEIGHT,
        justifyContent: 'center'
    },
    element: {
        marginTop: THEME.MARGIN_TOP_ELEMENT
    },
    rowElements: {
        //borderWidth: 1, borderColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        //borderWidth: 1, borderColor: 'black',
        marginTop: 0
    },
    text: {
        fontSize: 18,
        color: THEME.GREY_TEXT_COLOR
    },
    error: { 
        color: THEME.LIGHT_PRIMARY
    }
})
