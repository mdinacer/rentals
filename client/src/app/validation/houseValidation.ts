import * as yup from "yup";

const HouseAddressValidationSchema = yup.object({
    province: yup.string().required("This field is required"),
    city: yup.string().required("This field is required"),
    address1: yup.string().required("This field is required"),
    address2: yup.string(),
});

const HouseDetailsValidationSchema = yup.object({
    area: yup.number().typeError('Area must be a number').min(1, "Must be greater than 0").required(),
    floors: yup.number().typeError('Floors must be a number').min(0),
    rooms: yup.number().typeError('Rooms must be a number').min(1, "Must be greater than 0").required(),
    beds: yup.number().typeError('Beds must be a number').min(1, "Must be greater than 0").required(),
    baths: yup.number().typeError('Baths must be a number').min(1, "Must be greater than 0").required(),
    kitchens: yup.number().typeError('Kitchens must be a number').min(0),
    gardens: yup.number().typeError('Gardens must be a number').min(0),
    pool: yup.number().typeError('Pools must be a number').min(0),
    parking: yup.number().typeError('Parking must be a number').min(0),
    smokingFree: yup.boolean(),
    petsAllowed: yup.boolean()
});

export const HouseValidationSchema = yup.object({
    type: yup.string().min(5).required(),
    title: yup.string().min(5).required(),
    catchPhrase: yup.string().min(5, "Too short").required("This field is required"),
    details: HouseDetailsValidationSchema,
    address: HouseAddressValidationSchema,
    cover: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide a cover image')
    })
});

export const HouseEditValidationSchema = yup.object({
    type: yup.string().min(5).required(),
    title: yup.string().min(5).required(),
    catchPhrase: yup.string().min(5, "Too short").required("This field is required"),
    details: HouseDetailsValidationSchema,
    address: HouseAddressValidationSchema,
});
