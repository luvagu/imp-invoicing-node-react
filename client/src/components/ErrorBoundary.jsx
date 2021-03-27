import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor() {
        super()

        this.state = { 
            hasError: false 
        }
    }
    
    static getDerivedStateFromError(error) {    
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log(error)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <h2 className="p-6 text-center text-2xl text-indigo-700">Lo siento, esta página se ha perdido en el aire.</h2>
                    <div className="-mt-4 inline-block bg-cover bg-top lg:bg-center w-full h-full" style={{ backgroundImage: 'url(/img/404.png)' }} />
                </div>
            )
        }
        
        return this.props.children
    }
}

export default ErrorBoundary