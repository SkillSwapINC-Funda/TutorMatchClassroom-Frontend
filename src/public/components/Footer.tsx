
const Footer = () => {

    return (
        <footer className="bg-primary text-light py-3 sm:py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-base sm:text-lg">TutorMatch</span>
                        <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs sm:text-sm font-medium">Classroom</span>
                    </div>
                    <p className="text-xs sm:text-sm text-center sm:text-right">
                        © 2025 TutorMatch. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );

}

export default Footer