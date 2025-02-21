
// Validate property form data
export const validateForm = (propertyDetails, propertyImage, MAX_FILE_SIZE = 5 * 1024 * 1024) => {
    const errors = {};

    if (!propertyDetails.ownerName.trim()) {
        errors.ownerName = "Owner name is required";
    }

    if (!propertyDetails.propertyLocation) {
        errors.propertyLocation = "Property location is required";
    }

    if (!propertyDetails.propertyTitle.trim()) {
        errors.propertyTitle = "Property title is required";
    }

    if (!propertyDetails.phoneNumber.trim()) {
        errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(propertyDetails.phoneNumber)) {
        errors.phoneNumber = "Invalid phone number format";
    }

    if (!propertyDetails.price.trim()) {
        errors.price = "Price is required";
    } else if (isNaN(propertyDetails.price)) {
        errors.price = "Price must be a number";
    }

    if (!propertyDetails.propertyType) {
        errors.propertyType = "Property type is required";
    }

    if (!propertyDetails.description.trim()) {
        errors.description = "Description is required";
    }

    if (!propertyDetails.propertyFeatures.trim()) {
        errors.propertyFeatures = "Property feature is required";
    }

    if (!propertyImage) {
        errors.propertyImage = "Property image is required";
    } else {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(propertyImage.type)) {
            errors.propertyImage = "Only JPG, JPEG, or PNG images are allowed";
        }

        if (propertyImage.size > MAX_FILE_SIZE) {
            errors.propertyImage = "Image size must be 5MB or less";
        }
    }

    return Object.keys(errors).length === 0 ? null : errors;
}
