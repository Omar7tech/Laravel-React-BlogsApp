<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogResource;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Blog::query()->with('category' , 'user');

        // Handle search
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', '%' . $searchTerm . '%')
                  ->orWhere('content', 'like', '%' . $searchTerm . '%')
                  ->orWhere('slug', 'like', '%' . $searchTerm . '%'); // Assuming slug is searchable
            });
        }

        // Handle category filter
        if ($request->has('category')) {
            $categorySlug = $request->input('category');
            $category = Category::where('slug', $categorySlug)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        // Handle sorting
        if ($request->has('sort')) {
            $sortColumn = ltrim($request->input('sort'), '-'); // Remove '-' for column name
            $sortDirection = str_starts_with($request->input('sort'), '-') ? 'desc' : 'asc';
            $query->orderBy($sortColumn, $sortDirection);
        } else {
            // Default sort if no sort parameter is provided
            $query->latest();
        }

        $blogs = $query->paginate(16); // Or whatever paginate number you prefer

        return BlogResource::collection($blogs);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        try {
            $blog->load('user');
            return new BlogResource($blog);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Blog not found',
                'error' => 'The requested blog post could not be found.'
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
