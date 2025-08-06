
import { RegistrationForm } from '../../src/models/registrationForm';

export interface UserData {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    age?: number;
    acceptTerms?: boolean;
    country?: string;
    phoneNumber?: string;
    gender?: 'male' | 'female' | 'other' | null;
    bio?: string;
    birthDate?: Date;
    securityQuestion?: string;
    securityAnswer?: string;
    promoCode?: string;
    referralSource?: string;
}

export const validUser: UserData = {
    username: 'validuser123',
    email: 'valid.user@example.com',
    password: 'StrongPassword!1',
    confirmPassword: 'StrongPassword!1',
    age: 25,
    acceptTerms: true,
    country: 'Germany',
    phoneNumber: '+491701234567',
    gender: 'male',
    bio: 'This is a valid user bio.',
    birthDate: new Date(2000, 0, 15),
    securityQuestion: 'What is your favorite color?',
    securityAnswer: 'Blue',
    promoCode: 'TESTCODE',
    referralSource: 'Search Engine',
};

export const anotherValidUser: UserData = {
    username: 'JaneD8',
    email: 'jane.doe@test.org',
    password: 'Password_456!',
    confirmPassword: 'Password_456!',
    age: 40,
    acceptTerms: true,
    country: 'France',
    phoneNumber: '+33612345678',
    gender: 'female',
    bio: '',
    birthDate: new Date(1985, 6, 20),
    securityQuestion: 'What was your first car model?',
    securityAnswer: 'Golf',
    promoCode: '',
    referralSource: 'Friend',
};

export const invalidUserCases = {
    emptyUsername: { ...validUser, username: '' },
    shortUsername: { ...validUser, username: 'ab' },
    longUsername: { ...validUser, username: 'thisusernameiswaytoolongtobevalid' },

    invalidEmailFormat: { ...validUser, email: 'invalid-email.com' },
    emailMissingAt: { ...validUser, email: 'userdomain.com' },

    shortPassword: { ...validUser, password: 'short', confirmPassword: 'short' },
    passwordNoUppercase: { ...validUser, password: 'password123!', confirmPassword: 'password123!' },
    passwordNoDigit: { ...validUser, password: 'Password!!', confirmPassword: 'Password!!' },
    passwordNoSpecialChar: { ...validUser, password: 'Password123', confirmPassword: 'Password123' },

    passwordsMismatch: { ...validUser, password: 'Password123!', confirmPassword: 'MismatchedPass!1' },

    ageBelow18: { ...validUser, age: 17 },
    ageAbove100: { ...validUser, age: 101 },
    ageNotInteger: { ...validUser, age: 25.5 },
    ageNotNumber: { ...validUser, age: 'twenty' },

    termsNotAccepted: { ...validUser, acceptTerms: false },

    emptyCountry: { ...validUser, country: '' },

    invalidPhoneNumberShort: { ...validUser, phoneNumber: '123' },
    invalidPhoneNumberChars: { ...validUser, phoneNumber: 'abc1234567' },

    invalidGenderType: { ...validUser, gender: 'unknown' },

    longBio: { ...validUser, bio: 'A'.repeat(501) },
};

export default function applyUserData(form: RegistrationForm, data: UserData): RegistrationForm {
    if (data.username !== undefined) form.setUsername(data.username);
    if (data.email !== undefined) form.setEmail(data.email);
    if (data.password !== undefined) form.setPassword(data.password);
    if (data.confirmPassword !== undefined) form.setConfirmPassword(data.confirmPassword);
    if (data.age !== undefined) form.setAge(data.age);
    if (data.acceptTerms !== undefined) form.setAcceptTerms(data.acceptTerms);
    if (data.country !== undefined) form.setCountry(data.country);
    if (data.phoneNumber !== undefined) form.setPhoneNumber(data.phoneNumber);
    if (data.gender !== undefined) form.setGender(data.gender);
    if (data.bio !== undefined) form.setBio(data.bio);
    return form;
}
