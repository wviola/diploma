export class RegistrationForm {
    private _username: string = '';
    private _email: string = '';
    private _password: string = '';
    private _confirmPassword: string = '';
    private _age: number | null = null;
    private _acceptTerms: boolean = false;
    private _country: string = '';
    private _phoneNumber: string = '';
    private _gender: 'male' | 'female' | 'other' | null = null;
    private _bio: string = '';
    private _birthDate: Date | null = null;
    private _securityQuestion: string = '';
    private _securityAnswer: string = '';
    private _promoCode: string = '';
    private _referralSource: string = '';

    public setUsername(username: string): RegistrationForm {
        this._username = username;
        return this;
    }

    public getUsername(): string {
        if (this._username.trim() === '') {
            throw new Error('Username must be a non-empty string.');
        }
        if (this._username.length < 3 || this._username.length > 20) {
            throw new Error('Username must be between 3 and 20 characters');
        }
        return this._username;
    }

    public setEmail(email: string): RegistrationForm {
        this._email = email;
        return this;
    }

    public getEmail(): string {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this._email)) {
            throw new Error('Invalid email format');
        }
        return this._email;
    }

    public setPassword(password: string): RegistrationForm {
        this._password = password;
        return this;
    }

    public getPassword(): string {
        if (this._password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(this._password) || !/[a-z]/.test(this._password) || !/[0-9]/.test(this._password) || !/[!@#$%^&*]/.test(this._password)) {
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
        }
        return this._password;
    }

    public setConfirmPassword(confirmPassword: string): RegistrationForm {
        this._confirmPassword = confirmPassword;
        return this;
    }

    public getConfirmPassword(): string {
        if (this._confirmPassword !== this._password) {
            throw new Error('Passwords do not match');
        }
        return this._confirmPassword;
    }

    public setAge(age: number | null): RegistrationForm {
        this._age = age;
        return this;
    }

    public getAge(): number {
        if (typeof this._age !== 'number' || this._age < 18 || this._age > 100 || !Number.isInteger(this._age)) {
            throw new Error('Age must be an integer number between 18 and 100');
        }
        return this._age;
    }

    public setAcceptTerms(acceptTerms: boolean): RegistrationForm {
        this._acceptTerms = acceptTerms;
        return this;
    }

    public getAcceptTerms(): boolean {
        if (!this._acceptTerms) {
            throw new Error('You must accept the terms and conditions');
        }
        return this._acceptTerms;
    }

    public setCountry(country: string): RegistrationForm {
        this._country = country;
        return this;
    }

    public getCountry(): string {
        if (this._country.trim() === '') {
            throw new Error('Country must be a non-empty string');
        }
        return this._country;
    }

    public setPhoneNumber(phoneNumber: string): RegistrationForm {
        this._phoneNumber = phoneNumber;
        return this;
    }

    public getPhoneNumber(): string {
        const phoneRegex = /^\+?[0-9]{7,15}$/;
        if (!phoneRegex.test(this._phoneNumber)) {
            throw new Error('Invalid phone number format');
        }
        return this._phoneNumber;
    }

    public setGender(gender: 'male' | 'female' | 'other' | null): RegistrationForm {
        this._gender = gender;
        return this;
    }

    public getGender(): 'male' | 'female' | 'other' {
        if (this._gender === null || !['male', 'female', 'other'].includes(this._gender)) {
            throw new Error('Gender must be specified as "male", "female", or "other"');
        }
        return this._gender;
    }

    public setBio(bio: string): RegistrationForm {
        this._bio = bio;
        return this;
    }

    public getBio(): string {
        if (typeof this._bio !== 'string') {
            throw new Error('Bio must be a string.');
        }
        if (this._bio.length > 500) {
            throw new Error('Bio cannot exceed 500 characters');
        }
        return this._bio;
    }

    public isValid(): boolean {
        try {
            this.getUsername();
            this.getEmail();
            this.getPassword();
            this.getConfirmPassword();
            this.getAge();
            this.getAcceptTerms();
            this.getCountry();
            this.getPhoneNumber();
            this.getGender();
            this.getBio();
            return true;
        } catch (error) {
            return false;
        }
    }
}
