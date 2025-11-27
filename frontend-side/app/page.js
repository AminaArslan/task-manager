

export default function Page() {
  return (
  <div className="min-h-screen flex flex-col md:flex-row bg-purple-300">

     {/* left Text */}
  <div className="md:w-1/3 flex flex-col justify-center p-10">
    <h1 className="text-5xl font-bold text-purple-500 mb-4">TaskMaster Pro</h1>
    <p className="text-lg text-gray-700 mb-6">
      Organize your projects, track tasks, and collaborate efficiently with TaskMaster Pro. 
      Stay productive and manage everything in one place.
    </p>
    
  </div>

  {/* Right Image */}
  <div className="md:w-2/3 flex">
    <img src="/kanban.jpg" alt="Task Management" className="max-w-full h-auto" />
  </div>

 
</div>

    
  );
}