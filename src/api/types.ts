export interface AuthResponse {
    authToken: HToken;
    refreshToken: HToken;
    tokenType: string;
    authState: AuthState;
    error: AuthError;
}

export interface AuthState {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
}

export interface HToken {
    token: string;
    expiresIn: number;
}

export interface AuthError {
    description: string;
    code: string;
}

export interface EventListResponse {
    pagesAmount: number;
    events: Event[];
}

export interface Event {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    subtitle: string;
    primaryColor: string;
    banner: string;
    dateUTC: string;
    speakers: EventSpeaker[];
    sponsors: EventSponsor[];
    slug: string;
    arenaId: string;
    streamId: string;
    live: boolean;
    isPast: boolean;
    users: UserForEvent[];
}

export interface EventSpeaker {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    speaker: Speaker;
}

export interface EventSponsor {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    sponsor: Sponsor;
}

export interface Speaker {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    picture: string;
    video: string;
    bio: string;
}

export interface Sponsor {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    logo?: string;
}

export interface UserForEvent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    fullName: string;
    email: string;
    company: string;
    phone: string;
    country: string;
    city: string;
}
