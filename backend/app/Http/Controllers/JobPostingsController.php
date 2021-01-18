<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobPostingResource;
use App\Repository\JobPostingRepository;
use Illuminate\Http\Request;

class JobPostingsController extends Controller
{
    private const SORT_BY_FIELD = 'created_at';

    private JobPostingRepository $jobPostingRepository;

    public function __construct(JobPostingRepository $jobPostingRepository)
    {
       $this->jobPostingRepository = $jobPostingRepository;
    }

    public function index()
    {
        return JobPostingResource::collection(
            $this->jobPostingRepository->all()->sortByDesc(self::SORT_BY_FIELD)
        );
    }

    public function store(Request $request): JobPostingResource
    {
        return new JobPostingResource(
            $this->jobPostingRepository->create($request->all())
        );
    }

    public function update(Request $request, int $id)
    {
        if ($this->jobPostingRepository->update($id, $request->all())) {
            return response()->json([], 200);
        }
    }

    public function show(int $id): JobPostingResource
    {
        return new JobPostingResource(
            $this->jobPostingRepository->find($id)
        );
    }

    public function destroy(int $id)
    {
        return $this->jobPostingRepository->delete($id);
    }
}
