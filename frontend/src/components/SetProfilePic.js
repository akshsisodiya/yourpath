export const DEFAULT_IMG = 'https://res.cloudinary.com/yourpath/image/upload/v1622385179/default-user-icon-8_ckjjsx.jpg'

export default function SetProfilePic(setProfile, username) {
    function setDefault() {
        setProfile(DEFAULT_IMG)
    }
    async function setNewProfile(username) {
        const res = await fetch(`/api/UserProfileModel/?username=${username}`)
        if (res.status == 200) {
            const data = await res.json()
            if (data.profile) {
                setProfile(data.profile)
            }
        }
    }
    setDefault()
    setNewProfile(username)
}