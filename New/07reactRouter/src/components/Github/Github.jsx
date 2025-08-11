import React from "react";
import { useLoaderData } from "react-router-dom";

function Github(){
    const data = useLoaderData()
    
    return (
        <div className='min-h-screen bg-gray-100 py-8'>
            <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
                {/* Header Section */}
                <div className='bg-gradient-to-r from-gray-800 to-gray-600 text-white p-8'>
                    <div className='flex flex-col md:flex-row items-center gap-6'>
                        <img 
                            src={data.avatar_url} 
                            alt="GitHub Profile" 
                            className='w-32 h-32 rounded-full border-4 border-white shadow-lg'
                        />
                        <div className='text-center md:text-left'>
                            <h1 className='text-4xl font-bold'>{data.name || data.login}</h1>
                            <p className='text-xl text-gray-200'>@{data.login}</p>
                            {data.bio && <p className='mt-2 text-gray-300'>{data.bio}</p>}
                            <div className='flex flex-wrap gap-4 mt-4 justify-center md:justify-start'>
                                {data.location && (
                                    <span className='flex items-center gap-1'>
                                        📍 {data.location}
                                    </span>
                                )}
                                {data.company && (
                                    <span className='flex items-center gap-1'>
                                        🏢 {data.company}
                                    </span>
                                )}
                                {data.blog && (
                                    <a href={data.blog} target="_blank" rel="noopener noreferrer" 
                                       className='flex items-center gap-1 hover:text-blue-300'>
                                        🔗 Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50'>
                    <div className='text-center p-4 bg-white rounded-lg shadow'>
                        <div className='text-3xl font-bold text-blue-600'>{data.public_repos}</div>
                        <div className='text-gray-600'>Public Repos</div>
                    </div>
                    <div className='text-center p-4 bg-white rounded-lg shadow'>
                        <div className='text-3xl font-bold text-green-600'>{data.followers}</div>
                        <div className='text-gray-600'>Followers</div>
                    </div>
                    <div className='text-center p-4 bg-white rounded-lg shadow'>
                        <div className='text-3xl font-bold text-purple-600'>{data.following}</div>
                        <div className='text-gray-600'>Following</div>
                    </div>
                    <div className='text-center p-4 bg-white rounded-lg shadow'>
                        <div className='text-3xl font-bold text-orange-600'>{data.public_gists}</div>
                        <div className='text-gray-600'>Public Gists</div>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className='p-6'>
                    <h2 className='text-2xl font-bold mb-4 text-gray-800'>Additional Information</h2>
                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='space-y-3'>
                            <div className='flex justify-between'>
                                <span className='font-semibold text-gray-700'>Account Type:</span>
                                <span className='text-gray-600'>{data.type}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold text-gray-700'>Account Created:</span>
                                <span className='text-gray-600'>
                                    {new Date(data.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold text-gray-700'>Last Updated:</span>
                                <span className='text-gray-600'>
                                    {new Date(data.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                            {data.twitter_username && (
                                <div className='flex justify-between'>
                                    <span className='font-semibold text-gray-700'>Twitter:</span>
                                    <a href={`https://twitter.com/${data.twitter_username}`} 
                                       target="_blank" rel="noopener noreferrer"
                                       className='text-blue-500 hover:underline'>
                                        @{data.twitter_username}
                                    </a>
                                </div>
                            )}
                        </div>
                        
                        <div className='space-y-3'>
                            <div className='flex justify-between'>
                                <span className='font-semibold text-gray-700'>Profile Views:</span>
                                <span className='text-gray-600'>Public Profile</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold text-gray-700'>Hireable:</span>
                                <span className='text-gray-600'>
                                    {data.hireable ? '✅ Yes' : '❌ Not specified'}
                                </span>
                            </div>
                            {data.email && (
                                <div className='flex justify-between'>
                                    <span className='font-semibold text-gray-700'>Email:</span>
                                    <span className='text-gray-600'>{data.email}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Link */}
                <div className='p-6 bg-gray-50 text-center'>
                    <a 
                        href={data.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className='inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors'
                    >
                        View Full GitHub Profile
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Github

export const githubInfoLoader = async() => {
    const response = await fetch('https://api.github.com/users/Luckyverma04')
    return response.json()
}