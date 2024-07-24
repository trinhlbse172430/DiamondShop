import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext({});

function countItemsInLocalStorageKey(key) {
    // Retrieve the value from localStorage
    let value = localStorage.getItem(key);

    // Check if the value exists and is not null
    if (value) {
        try {
            // Parse the JSON string into an array or object
            let parsedValue = JSON.parse(value);

            // Check the type and count items accordingly
            if (Array.isArray(parsedValue)) {
                return parsedValue.length;
            } else if (typeof parsedValue === 'object') {
                // If it's an object, count its keys (assuming each key is an item)
                return Object.keys(parsedValue).length;
            } else {
                // Handle other data types as needed
                return 1; // Return 1 assuming it's a single item (non-array, non-object)
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return 0; // Return 0 if parsing fails
        }
    } else {
        return 0; // Return 0 if the key doesn't exist or value is null
    }
}


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [productNumber, setProductNumber] = useState();

    const handleLoadProductNumber = async () => {
        setProductNumber(countItemsInLocalStorageKey('cart'));
    }

    const value = {
        auth,
        productNumber,
        setAuth,
        setProductNumber,
    }

    // useEffect(() => {
    //     console.log('auth', auth);
    // }, [auth])

    useEffect(() => {
        console.log('productNumber', productNumber);
    }, [productNumber])

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            handleLoadProductNumber();
        }
    }, [localStorage.getItem('cart'), auth])

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            if (auth.role === undefined) {

                const dataDecode = jwtDecode(localStorage.getItem('token'));
                // console.log('dataDecode', dataDecode);

                setAuth({
                    id: dataDecode.CustomerID,
                    fullname: dataDecode.CusName,
                    phone: dataDecode.CusPhone,
                    address: dataDecode.CusAddress,
                    empId: dataDecode.EmployeeID,
                    empName: dataDecode.EmpName,
                    empPhone: dataDecode.EmpPhone,
                    empEmail: dataDecode.EmpGmail,
                    role: localStorage.getItem('role'),
                    token: localStorage.getItem('token'),
                });
            }
        }
    }, [localStorage.getItem('token')])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;