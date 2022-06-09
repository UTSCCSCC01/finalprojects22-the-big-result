import Provider from './Provider'
import Header from './Header'

const providerList = [
    {
        "name": "Mike Ross",
        "service": "Landscaping",
        "description": "Hard working landscaper who will make your yard look pretty",
        "price": 50,
        "profilePicURL": "https://picsum.photos/100"
    },
    {
        "name": "Steven Adams",
        "service": "Haircutting",
        "description": "Over 5+ years of serving satisfied customers",
        "price": 60,
        "profilePicURL": "https://picsum.photos/101"
    },
    {
        "name": "Alice Schulz",
        "service": "Haircutting",
        "description": "Best in the business for all your haircutting needs",
        "price": 70,
        "profilePicURL": "https://picsum.photos/102"
    }
]

function ProviderPage(props) {
    return (
    <div>
        <Header/>
        <div>
        {providerList.map((provider) => (
            <Provider name = {provider.name}
                service = {provider.service}
                description = {provider.description}
                price = {provider.price}
                profilePicURL = {provider.profilePicURL}/>))}
        </div>
    </div>
    )
  }
  
  export default ProviderPage;