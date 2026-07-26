"use client";

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error(error);
    console.error(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

          <div className="bg-white shadow-lg rounded-xl p-10 text-center">

            <h1 className="text-3xl font-bold text-red-600">
              Something went wrong
            </h1>

            <p className="mt-4 text-gray-600">
              Please refresh the page.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-green-700 text-white px-5 py-3 rounded-lg"
            >
              Refresh
            </button>

          </div>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;