export default function BackgroundOverlay() {
    return (
        <div
            className="absolute inset-0 z-0"
            style={{
                background: 'linear-gradient(rgba(45,10,15,0.45), rgba(25,5,10,0.75))'
            }}
        />
    );
}
