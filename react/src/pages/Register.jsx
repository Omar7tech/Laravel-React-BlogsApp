import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Registration attempt:", formData);
        // Handle successful registration here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-2xl font-bold text-center mb-6">Create Account</h1>

                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.name}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.email}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.password}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control mt-6">
                            <button onClick={handleSubmit} className="btn btn-primary">
                                Create Account
                            </button>
                        </div>
                    </div>

                    <div className="divider">OR</div>

                    <div className="text-center">
                        <span className="text-sm">Already have an account? </span>
                        <Link to={'/login'} className="link link-primary">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
