import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/edit_pet.css";

export const Edit_pet = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [gender, setGender] = useState("");
    const [birth, setBirth] = useState(null);
    const [spayedNeutered, setSpayedNeutered] = useState("");
    const [weight, setWeight] = useState("");
    const [imageSizeError, setImageSizeError] = useState(false);
    const [uploadImage, setUploadImage] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const successAlertRef = useRef(null);
    const params = useParams();

    const handleImageUpload = (event) => {
        const files = event.target.files;
        let file_size = files[0].size;
        if (file_size <= 100000) {
            setImageSizeError(false);
            setUploadImage(files[0]);
        } else {
            setImageSizeError(true);
            alert("Image is too large.");
        }
    };

    useEffect(() => {
        const authenticate = async () => {
            let user = await actions.getProfile();
            if (user) {
                let dog = user.dogs.find((item, index ) => item.id == params.id)
                setName(dog.name),
                setBreed(dog.breed),
                setBirth(dog.birth),
                setWeight(dog.weight),
                setGender(dog.gender),
                setSpayedNeutered(dog.spayedNeutered),
                setAvatar(dog.avatar)
            } else {
                setAuthStatus("denied");
            }
        };
        authenticate();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dog = {
            id: params.id,
            name: name,
            breed: breed,
            gender: gender,
            birth: birth,
            spayedNeutered: spayedNeutered,
            weight: weight,
        };
        if (uploadImage) {
            dog["avatar"] = uploadImage
        }
        let success = await actions.editPetInfo(dog);
        if (success) {
            setName("");
            setBreed("");
            setGender("");
            setBirth("");
            setSpayedNeutered("");
            setWeight("");
            setAvatar(null);
            setSuccessMessage("Dog info successfully edited!");
            successAlertRef.current.focus();
            setTimeout(() => {
                navigate("/private");
            }, 1000);
        } else {
            alert("An error occurred while editing your dog's info. Please, try again later.");
        }
    };

    return (
        <div className="editPetContainer">
            {successMessage && (
                <div
                    className="alert alert-success"
                    role="alert"
                    tabIndex="-1"
                    ref={successAlertRef}
                >
                    {successMessage}
                </div>
            )}
            <form className="editPetForm row g-4" onSubmit={handleSubmit}>
                <h1 className="form-title d-flex justify-content-center">
                    Edit Pet Info
                </h1>
                <div className="col-md-12 d-flex align-items-center">
                    <div className="image-container me-3">
                        {uploadImage ? (
                            <img
                                src={URL.createObjectURL(uploadImage)}
                                height="200"
                                width="200"
                                alt="Uploaded Preview"
                                className="rounded-circle"
                            />
                        ) : (
                            <img
                                src={avatar}
                                height="200"
                                width="200"
                                alt="Placeholder"
                                className="rounded-circle"
                            />
                        )}
                    </div>
                    <div className="file-input-container">
                        <label htmlFor="imageInput" className="form-label">
                            Upload picture
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="imageInput"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="dogName" className="form-label">
                        Name
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        className="form-control"
                        id="dogName"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="dogBreed" className="form-label">
                        Breed
                    </label>
                    <input
                        onChange={(e) => setBreed(e.target.value)}
                        value={breed}
                        type="text"
                        className="form-control"
                        id="dogBreed"
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="birthday" className="form-label">
                        Date of Birth
                    </label>
                    <input
                        onChange={(e) => setBirth(e.target.value)}
                        type="date"
                        className="form-control"
                        id="birthday"
                    />
                </div>
                <div className="col-md-12">
                    <div className="weight-buttons mb-3 text-center">
                        <p className="buttonsTitle">Weight</p>
                        <input
                            onChange={() => setWeight("0-25 lbs")}
                            type="radio"
                            value="0-25 lbs"
                            className="btn-check"
                            name="weight-options"
                            id="option1-outlined"
                            autoComplete="off"
                        />
                        <label
                            className="btn btn-outline-warning me-3 mb-3 px-5"
                            htmlFor="option1-outlined"
                        >
                            0-25lbs
                        </label>
                        <input
                            onChange={() => setWeight("25-50 lbs")}
                            type="radio"
                            value="25-50 lbs"
                            className="btn-check"
                            name="weight-options"
                            id="option2-outlined"
                            autoComplete="off"
                        />
                        <label
                            className="btn btn-outline-warning me-3 mb-3 px-5"
                            htmlFor="option2-outlined"
                        >
                            25-50lbs
                        </label>
                        <input
                            onChange={() => setWeight("50-100 lbs")}
                            type="radio"
                            value="50-100 lbs"
                            className="btn-check"
                            name="weight-options"
                            id="option3-outlined"
                            autoComplete="off"
                        />
                        <label
                            className="btn btn-outline-warning me-3 mb-3 px-5"
                            htmlFor="option3-outlined"
                        >
                            50-100lbs
                        </label>
                        <input
                            onChange={() => setWeight("100+ lbs")}
                            type="radio"
                            value="100+ lbs"
                            className="btn-check"
                            name="weight-options"
                            id="option4-outlined"
                            autoComplete="off"
                        />
                        <label
                            className="btn btn-outline-warning mb-3 px-5"
                            htmlFor="option4-outlined"
                        >
                            100lbs+
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="gender-buttons text-center mb-3">
                        <p className="buttonsTitle">Gender</p>
                        <input
                            onChange={() => setGender("Male")}
                            type="radio"
                            value="Male"
                            className="btn-check"
                            name="gender-options"
                            id="male-outlined"
                            autoComplete="off"
                        />
                        <label
                            className="btn btn-outline-warning mb-3 me-5 px-5"
                            htmlFor="male-outlined"
                        >
                            Male
                        </label>
                        <input
                            onChange={() => setGender("Female")}
                            type="radio"
                            value="Female"
                            className="btn-check"
                            name="gender-options"
                            id="female-outlined"
                            autoComplete="off"
                        />
                        <label
                            className="btn btn-outline-warning mb-3 px-5"
                            htmlFor="female-outlined"
                        >
                            Female
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="spayed-neutered text-center mb-3">
                        <p className="buttonsTitle">Spayed / Neutered</p>
                        <input
                            onChange={() => setSpayedNeutered("Yes")}
                            type="radio"
                            value="Yes"
                            className="btn-check"
                            name="spayedNeutered-options"
                            id="yes-outlined"
                            autoComplete="off"
                        />
                        <label
                            className="btn btn-outline-warning mb-3 me-5 px-5"
                            htmlFor="yes-outlined"
                        >
                            Yes
                        </label>
                        <input
                            onChange={() => setSpayedNeutered("No")}
                            type="radio"
                            value="No"
                            className="btn-check"
                            name="spayedNeutered-options"
                            id="no-outlined"
                            autoComplete="off"
                        />
                        <label
                            className="btn btn-outline-warning mb-3 px-5"
                            htmlFor="no-outlined"
                        >
                            No
                        </label>
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    <button
                        type="submit"
                        className="btn btn-lg saveButton me-5"
                    >
                        Save
                    </button>
                    <Link to={`/private`}>
                        <button type="button" className="btn btn-danger btn-lg cancelButton">
                            Cancel
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
