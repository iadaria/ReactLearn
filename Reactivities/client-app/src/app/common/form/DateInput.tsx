import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { StandardTextFieldProps } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText  from '@material-ui/core/FormHelperText';
import { 
    KeyboardDatePicker, 
    BaseDatePickerProps,
    DatePickerViewsProps } from '@material-ui/pickers';
import './date-input.sass';

interface IProps extends 
    FieldRenderProps<Date, HTMLElement>
    //,StandardTextFieldProps
    //,BaseDatePickerProps
    ,DatePickerViewsProps
    {}

const DateInput: React.FC<IProps> = (props) => {
    const {
        input: {value, name, onChange, ...restInput},
        placeholder, 
        //date = false,
        //time = false,
        meta: {touched, error},
        fullWidth = true,
        ...rest
    } = props;
    let errorText = "";
    //console.log("props in SelectInput");
    //console.log(props);
    return (
            <FormControl
                //className="date-input"
                error={touched && !!error}
                fullWidth={fullWidth}
            >
                <KeyboardDatePicker 
                    name={name}
                    value={value || null}
                    onChange={onChange}
                    format="MM/dd/yyyy"
                    //inputProps={restInput}
                    error={touched && !!error}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    size="small"
                    
                    {...rest}
                />
                {/* <DateTimePicker
                    placeholder={placeholder}
                    value={value || null}
                    onChange={onChange}
                    date={date}
                    time={time}
                    //inputProps={restInput}
                /> */}
                {/* <FormHelperText>{errorText}</FormHelperText> */}
            </FormControl>
    );
};

export default DateInput;
