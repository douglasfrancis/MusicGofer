import React from 'react'
import { useAuth } from '../../Context/AuthContext'

export default function UserProfile() {

    const {currentUser} = useAuth()

    return (
        <div>
            {currentUser.email}
        </div>
    )
}
