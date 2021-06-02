export const DEFAULT_IMG = 'https://res.cloudinary.com/yourpath/image/upload/v1622550999/default-user-icon-8_balob4.jpg'

export default function SetProfilePic(profile, setProfile, username) {
    function setDefault() {
        setProfile(DEFAULT_IMG)
    }
    async function setNewProfile(username) {
        const res = await fetch(`/api/MiniUserProfileModel/?username=${username}`)
        if (res.status == 200) {
            const [data] = await res.json()
            if (data.profile) {
                setProfile(data.profile)
            }
        }
    }    
    setDefault()    
    setNewProfile(username)    
}