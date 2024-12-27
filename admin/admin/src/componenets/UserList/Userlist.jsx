import React,{useEffect,useState} from 'react'
import './Userlist.css'

const Userlist = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Fetch the users from the backend on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:4000/userlist', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // You might need to send a token here for admin access
                }
            });
            const contentType = response.headers.get('content-type');

            if (response.ok) {
                if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setUsers(data.users);
            } else {
                console.error('Unexpected content-type:', contentType);
                setError('Unexpected content-type from server.');
            }
            
            } else {
                const errorText = await response.text(); // Read the error response as text
            console.error('Error Response:', errorText);
            setError(`Failed to fetch users. Server responded with: ${errorText}`);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Error fetching user data: ' + error.message);
        }
    };

    return (
        <div className='userli'>
            
            <h1>User List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table className='utb' border="1">
                <thead className='thed'>
                    <tr >
                        <th className='uth'>Name</th>
                        <th className='uth'>Email</th>
                        <th className='uth'>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr  key={user.email}>
                                <td className='uthd'>{user.name}</td>
                                <td className='uthd'>{user.email}</td>
                                <td className='uthd'>{user.password}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

}

export default Userlist