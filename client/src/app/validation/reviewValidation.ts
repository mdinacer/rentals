
import * as yup from "yup";

export const reviewValidationSchema = yup.object({
    body: yup.string(),
    rating: yup.number().min(0).max(10).required("This field is required"),

});