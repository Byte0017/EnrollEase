import { toast } from 'react-toastify';
import { auth, db } from '@/context/Firebase';
import { setDoc, doc, getDocs, collection, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export interface RegisterFormData {
  jeeMainsNumber: string;
  name: string;
  phone: string;
  email: string;
  password: string;
}

const fakeUser = {
  jeeMainsNumber: '808080808080',
  email: 'ajay.21609@knit.ac.in',
  phone: '8004888135'
};

interface DuplicateCheckResult {
  hasDuplicates: boolean;
  errors: string[];
  fieldsToReset: string[];
}

const checkIfExists = async (jeeMainsNumber: string, email: string, phone: string): Promise<DuplicateCheckResult> => {
  const usersRef = collection(db, 'users');
  const result: DuplicateCheckResult = {
    hasDuplicates: false,
    errors: [],
    fieldsToReset: []
  };

  // Firestore checks with explicit validation
  const firestoreChecks = [
    { field: 'jeeMainsNumber', value: jeeMainsNumber, errorMsg: 'This JEE Mains number is already registered!' },
    { field: 'email', value: email, errorMsg: 'This email is already registered!' },
    { field: 'phone', value: phone, errorMsg: 'This phone number is already registered!' },
  ];

  for (const { field, value, errorMsg } of firestoreChecks) {
    try {
      const q = query(usersRef, where(field, '==', value));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        console.log(`Duplicate found in Firestore for ${field}: ${value}`);
        console.log('Matching documents:', snapshot.docs.map(doc => doc.data()));
        result.hasDuplicates = true;
        result.errors.push(errorMsg);
        result.fieldsToReset.push(field);
      } else {
        console.log(`No duplicate found in Firestore for ${field}: ${value}`);
      }
    } catch (error) {
      console.error(`Error checking ${field} in Firestore:`, error);
      result.errors.push(`Error validating ${field}. Please try again.`);
    }
  }

  // Only check fakeUser if no duplicates in Firestore
  if (!result.hasDuplicates) {
    const fakeChecks = [
      { field: 'jeeMainsNumber', value: jeeMainsNumber, compare: fakeUser.jeeMainsNumber, errorMsg: 'This JEE Mains number is reserved!' },
      { field: 'email', value: email, compare: fakeUser.email, errorMsg: 'This email is reserved!' },
      { field: 'phone', value: phone, compare: fakeUser.phone, errorMsg: 'This phone number is reserved!' },
    ];

    fakeChecks.forEach(({ field, value, compare, errorMsg }) => {
      if (value === compare) {
        console.log(`Duplicate found in fakeUser for ${field}: ${value}`);
        result.hasDuplicates = true;
        result.errors.push(errorMsg);
        result.fieldsToReset.push(field);
      }
    });
  }

  return result;
};

export const register = async (data: RegisterFormData, setValue: any, onSuccess: () => void) => {
  console.log('Registering with:', { ...data, password: '[hidden]' });

  try {
    // Check for duplicates
    const duplicateCheck = await checkIfExists(data.jeeMainsNumber, data.email, data.phone);

    if (duplicateCheck.hasDuplicates) {
      duplicateCheck.errors.forEach((msg) => toast.error(msg));
      duplicateCheck.fieldsToReset.forEach((field) => setValue(field, ''));
      throw new Error('Duplicate entry found');
    }

    // Attempt to create user in Firebase Auth
    let userCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (authError: any) {
      console.error('Firebase Auth error:', authError);
      if (authError.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered with Firebase Authentication!');
        setValue('email', '');
        throw new Error('Firebase auth duplicate email');
      } else if (authError.code === 'auth/weak-password') {
        toast.error('Password is too weak. Please use a stronger password.');
        setValue('password', '');
        throw authError;
      } else if (authError.code === 'auth/invalid-email') {
        toast.error('Invalid email format.');
        setValue('email', '');
        throw authError;
      }
      throw authError;
    }

    const user = userCredential.user;

    // Store in Firestore
    try {
      await setDoc(doc(db, 'users', user.uid), {
        jeeMainsNumber: data.jeeMainsNumber,
        name: data.name,
        phone: data.phone,
        email: data.email,
        createdAt: new Date().toISOString(),
      });
      console.log(`Successfully saved user data in Firestore for UID: ${user.uid}`);
    } catch (firestoreError) {
      console.error('Firestore save failed:', firestoreError);
      await user.delete(); // Cleanup auth user if Firestore fails
      toast.error('Failed to save user data. Registration cancelled.');
      throw new Error('Failed to save user data');
    }

    toast.success('Registration successful!');
    onSuccess();
  } catch (error: any) {
    console.error('Registration failed:', error);

    if (error.message === 'Duplicate entry found' || error.message === 'Firebase auth duplicate email') {
      return; // Errors already handled with toast messages
    }

    if (!error.code || error.message === 'Failed to save user data') {
      // Generic error already handled in specific catch blocks
      return;
    }

    toast.error('Registration failed. Please try again later.');
    throw error;
  }
};