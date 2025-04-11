export const getWishlist = () => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    }
    return [];
};

export const saveWishlist = (wishlist) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        // Dispatch a custom event to notify other parts of app (like Navbar) that wishlist has been updated
        // So that components can listen for this event and update themselves without reloading
        window.dispatchEvent(new Event("wishlist-updated"));
    }
};