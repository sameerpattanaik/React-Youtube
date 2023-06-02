import React from 'react';

const commentsData = [
    {
        name: "sameer pattanaik",
        text: "comment1 is ist of its type",
        replies: [
            {
                name: "sameer pattanaik",
                text: "comment1 is ist of its type",
                replies: [
        
                ]
            },
            {
                name: "sameer pattanaik",
                text: "comment1 is ist of its type",
                replies: [
        
                ]
            },
            {
                name: "sameer pattanaik",
                text: "comment1 is ist of its type",
                replies: [
                    {
                        name: "sameer pattanaik",
                        text: "comment1 is ist of its type",
                        replies: [
                            {
                                name: "sameer pattanaik",
                                text: "comment1 is ist of its type",
                                replies: [
                                    {
                                        name: "sameer pattanaik",
                                        text: "comment1 is ist of its type",
                                        replies: [
                                
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        name: "sameer pattanaik",
        text: "comment1 is ist of its type",
        replies: [

        ]
    },
    {
        name: "sameer pattanaik",
        text: "comment1 is ist of its type",
        replies: [

        ]
    },
    {
        name: "sameer pattanaik",
        text: "comment1 is ist of its type",
        replies: [

        ]
    },
];

const Comment = ({data}) => {
    const {name, text, replies } = data;
    return <div className='flex  shadow-sm bg-gray-100 p-2 rounded-lg w-3/4 my-2'>
        <img className='w-12 h-12'
        alt="user" src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" />
        <div className='px-3'>
            <p className='font-bold'>{name}</p>
            <p>{text}</p>
        </div>
    </div>
}

const CommentsList = ({comments}) => {

   return comments.map((comment, index) => (
    <div key={index}>
     <Comment  data={comment} />
     <div className='pl-5 border border-l-black m-5'>
       <CommentsList comments={comment.replies}/>
     </div>
   </div>
   ))
   
};



const CmmentsContainer = () => {

  return (
    <div className='m-5 p-2'>
      <h1 className='text-2xl font-bold'>Comments: </h1>
      <CommentsList comments={commentsData}     />
    </div>
  )
}

export default CmmentsContainer
