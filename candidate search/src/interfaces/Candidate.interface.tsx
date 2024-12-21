// TODO: Create an interface for the Candidate objects returned by the API
// Interface with the objects that are used in the Candidate Search - Every candidate will have an avatar image, login (username), location, email, company, and bio
export interface Candidate {
    avatar_url: string;
    login: string;
    location: string;
    email: string;
    company: string;
    bio: string,
}
