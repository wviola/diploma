export class RegistrationForm {
    private username: string = '';
    private email: string = '';
    private password: string = '';
    private confirmPassword: string = '';
    private age: number | null = null;
    private acceptTerms: boolean = false;
    private country: string = '';
    private phoneNumber: string = '';
    private gender: 'male' | 'female' | 'other' | null = null;
    private bio: string = '';

    public setUsername(username: string): RegistrationForm {
        this.username = username;
        return this;
    }

    public getUsername(): string {
        if (this.username.trim() === '') {
            throw new Error('Username must be a non-empty string.');
        }
        if (this.username.length < 3 || this.username.length > 20) {
            throw new Error('Username must be between 3 and 20 characters');
        }
        return this.username;
    }

    public setEmail(email: string): RegistrationForm {
        this.email = email;
        return this;
    }

    public getEmail(): string {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            throw new Error('Invalid email format');
        }
        return this.email;
    }

    public setPassword(password: string): RegistrationForm {
        this.password = password;
        return this;
    }

    public getPassword(): string {
        if (this.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(this.password) || !/[a-z]/.test(this.password) || !/[0-9]/.test(this.password) || !/[!@#$%^&*]/.test(this.password)) {
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
        }
        return this.password;
    }

    public setConfirmPassword(confirmPassword: string): RegistrationForm {
        this.confirmPassword = confirmPassword;
        return this;
    }

    public getConfirmPassword(): string {
        if (this.confirmPassword !== this.password) {
            throw new Error('Passwords do not match');
        }
        return this.confirmPassword;
    }

    public setAge(age: number | null): RegistrationForm {
        this.age = age;
        return this;
    }

    public getAge(): number {
        if (typeof this.age !== 'number' || this.age < 18 || this.age > 100 || !Number.isInteger(this.age)) {
            throw new Error('Age must be an integer number between 18 and 100');
        }
        return this.age;
    }

    public setAcceptTerms(acceptTerms: boolean): RegistrationForm {
        this.acceptTerms = acceptTerms;
        return this;
    }

    public getAcceptTerms(): boolean {
        if (!this.acceptTerms) {
            throw new Error('You must accept the terms and conditions');
        }
        return this.acceptTerms;
    }

    public setCountry(country: string): RegistrationForm {
        this.country = country;
        return this;
    }

    public getCountry(): string {
        if (this.country.trim() === '') {
            throw new Error('Country must be a non-empty string');
        }
        return this.country;
    }

    public setPhoneNumber(phoneNumber: string): RegistrationForm {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public getPhoneNumber(): string {
        const phoneRegex = /^\+?[0-9]{7,15}$/;
        if (!phoneRegex.test(this.phoneNumber)) {
            throw new Error('Invalid phone number format');
        }
        return this.phoneNumber;
    }

    public setGender(gender: 'male' | 'female' | 'other' | null): RegistrationForm {
        this.gender = gender;
        return this;
    }

    public getGender(): 'male' | 'female' | 'other' {
        if (this.gender === null || !['male', 'female', 'other'].includes(this.gender)) {
            throw new Error('Gender must be specified as "male", "female", or "other"');
        }
        return this.gender;
    }

    public setBio(bio: string): RegistrationForm {
        this.bio = bio;
        return this;
    }

    public getBio(): string {
        if (typeof this.bio !== 'string') {
            throw new Error('Bio must be a string.');
        }
        if (this.bio.length > 500) {
            throw new Error('Bio cannot exceed 500 characters');
        }
        return this.bio;
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