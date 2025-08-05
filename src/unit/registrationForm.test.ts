import { RegistrationForm } from '../models/registrationForm';
import applyUserData, { validUser, anotherValidUser, invalidUserCases } from '../../fixtures/userData';

describe('Positive Cases', () => {
    let form: RegistrationForm;

    beforeEach(() => {
        form = new RegistrationForm();
    });

    test('should correctly set and get a valid username', () => {
        form.setUsername('testuser');
        expect(form.getUsername()).toBe('testuser');
    });

    test('should correctly set and get username with min length', () => {
        form.setUsername('abc');
        expect(form.getUsername()).toBe('abc');
    });

    test('should correctly set and get username with max length', () => {
        form.setUsername('averylongusername20');
        expect(form.getUsername()).toBe('averylongusername20');
    });

    test('should correctly set and get a valid email', () => {
        form.setEmail('test@example.com');
        expect(form.getEmail()).toBe('test@example.com');
    });

    test('should correctly set and get email with subdomain', () => {
        form.setEmail('user@sub.domain.com');
        expect(form.getEmail()).toBe('user@sub.domain.com');
    });

    test('should correctly set and get a valid password and confirm password', () => {
        form.setPassword('Password123!');
        form.setConfirmPassword('Password123!');
        expect(form.getPassword()).toBe('Password123!');
        expect(form.getConfirmPassword()).toBe('Password123!');
    });

    // Позитивные кейсы для setAge и getAge
    test('should correctly set and get a age 18', () => {
        form.setAge(18);
        expect(form.getAge()).toBe(18);
    });

    test('should correctly set and get a age middle', () => {
        form.setAge(50);
        expect(form.getAge()).toBe(50);
    });

    test('should correctly set and get a  age 100', () => {
        form.setAge(100);
        expect(form.getAge()).toBe(100);
    });

    test('should correctly set and get accept terms to true', () => {
        form.setAcceptTerms(true);
        expect(form.getAcceptTerms()).toBe(true);
    });

    test('should correctly set and get a valid country', () => {
        form.setCountry('Poland');
        expect(form.getCountry()).toBe('Poland');
    });

    test('should correctly set and get a valid phone number', () => {
        form.setPhoneNumber('+48123456789');
        expect(form.getPhoneNumber()).toBe('+48123456789');
    });

    test('should correctly set and get a phone number without plus sign', () => {
        form.setPhoneNumber('1234567');
        expect(form.getPhoneNumber()).toBe('1234567');
    });

    test('should correctly set and get gender to male', () => {
        form.setGender('male');
        expect(form.getGender()).toBe('male');
    });

    test('should correctly set and get gender to other', () => {
        form.setGender('other');
        expect(form.getGender()).toBe('other');
    });

    test('should correctly set and get bio with valid length (empty)', () => {
        form.setBio('');
        expect(form.getBio()).toBe('');
    });

    test('should correctly set and get bio with valid length', () => {
        const maxBio = 'A'.repeat(500);
        form.setBio(maxBio);
        expect(form.getBio()).toBe(maxBio);
    });

    test('should return true when all fields are valid using validUser fixture', () => {
        applyUserData(form, validUser);
        expect(form.isValid()).toBe(true);
    });

    test('should return true when all fields are valid using anotherValidUser fixture', () => {
        applyUserData(form, anotherValidUser);
        expect(form.isValid()).toBe(true);
    });
});

describe('Negative Cases', () => {
    let form: RegistrationForm;

    beforeEach(() => {
        form = new RegistrationForm();
    });

    test('getUsername should throw error for empty username', () => {
        form.setUsername('');
        expect(() => form.getUsername()).toThrow('Username must be a non-empty string');
    });

    test('getUsername should throw error for username too short', () => {
        form.setUsername('ab');
        expect(() => form.getUsername()).toThrow('Username must be between 3 and 20 characters');
    });

    test('getUsername should throw error for username too long', () => {
        const longUsername = 'a'.repeat(21);
        form.setUsername(longUsername);
        expect(() => form.getUsername()).toThrow('Username must be between 3 and 20 characters');
    });

    // Email
    test('getEmail should throw error for invalid email format', () => {
        form.setEmail('invalid-email.com');
        expect(() => form.getEmail()).toThrow('Invalid email format');
    });

    test('getEmail should throw error for email missing "@" symbol', () => {
        form.setEmail('userdomain.com');
        expect(() => form.getEmail()).toThrow('Invalid email format');
    });

    // Password
    test('getPassword should throw error for password too short', () => {
        form.setPassword('short');
        expect(() => form.getPassword()).toThrow('Password must be at least 8 characters long');
    });

    test('getPassword should throw error for password without uppercase', () => {
        form.setPassword('password123!');
        expect(() => form.getPassword()).toThrow('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
    });

    // Confirm Password
    test('getConfirmPassword should throw error when passwords do not match', () => {
        form.setPassword('Password123!');
        form.setConfirmPassword('WrongPass123!');
        expect(() => form.getConfirmPassword()).toThrow('Passwords do not match');
    });

    // Age
    test('getAge should throw error for age below 18', () => {
        form.setAge(17);
        expect(() => form.getAge()).toThrow('Age must be an integer number between 18 and 100');
    });

    test('getAge should throw error for non-integer age', () => {
        form.setAge(25.5);
        expect(() => form.getAge()).toThrow('Age must be an integer number between 18 and 100');
    });

    // Accept Terms
    test('getAcceptTerms should throw error when terms are not accepted', () => {
        form.setAcceptTerms(false);
        expect(() => form.getAcceptTerms()).toThrow('You must accept the terms and conditions');
    });

    // Country
    test('getCountry should throw error for empty country', () => {
        form.setCountry('');
        expect(() => form.getCountry()).toThrow('Country must be a non-empty string');
    });

    // Phone Number
    test('getPhoneNumber should throw error for invalid phone number (too short)', () => {
        form.setPhoneNumber('123');
        expect(() => form.getPhoneNumber()).toThrow('Invalid phone number format');
    });

    // Gender
    test('getGender should throw error for null gender', () => {
        form.setGender(null);
        expect(() => form.getGender()).toThrow('Gender must be specified as "male", "female", or "other"');
    });

    test('getGender should throw error for invalid gender value', () => {
        form.setGender('unknown' as any); // Принудительно устанавливаем невалидное значение
        expect(() => form.getGender()).toThrow('Gender must be specified as "male", "female", or "other"');
    });

    // Bio
    test('getBio should throw error for bio exceeding max length', () => {
        form.setBio('A'.repeat(501));
        expect(() => form.getBio()).toThrow('Bio cannot exceed 500 characters');
    });
});

describe('Cases for valid form', () => {
    let form: RegistrationForm;

    beforeEach(() => {
        form = new RegistrationForm();
    });


    test('isValid should return false if an invalid username is set', () => {
        applyUserData(form, validUser);
        form.setUsername(invalidUserCases.shortUsername.username!);
        expect(form.isValid()).toBe(false);
    });

    test('isValid should return false if email format is invalid', () => {
        applyUserData(form, validUser);
        form.setEmail(invalidUserCases.invalidEmailFormat.email!);
        expect(form.isValid()).toBe(false);
    });

    test('isValid should return false if password is too short', () => {
        applyUserData(form, validUser);
        form.setPassword(invalidUserCases.shortPassword.password!);
        form.setConfirmPassword(invalidUserCases.shortPassword.confirmPassword!);
        expect(form.isValid()).toBe(false);
    });

    test('isValid should return false if passwords do not match', () => {
        applyUserData(form, validUser);
        form.setPassword('Password123!');
        form.setConfirmPassword('DifferentPass!');
        expect(form.isValid()).toBe(false);
    });

    test('isValid should return false if age is below 18', () => {
        applyUserData(form, validUser);
        form.setAge(invalidUserCases.ageBelow18.age!);
        expect(form.isValid()).toBe(false);
    });

    test('isValid should return false if terms are not accepted', () => {
        applyUserData(form, validUser);
        form.setAcceptTerms(invalidUserCases.termsNotAccepted.acceptTerms!);
        expect(form.isValid()).toBe(false);
    });

    test('isValid should return false if gender is not set null', () => {
        applyUserData(form, validUser);
        form.setGender(null);
        expect(form.isValid()).toBe(false);
    });
});