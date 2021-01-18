<?php

namespace App\Repository;

use App\Models\JobPosting;

class JobPostingRepository extends BaseRepository implements JobPostingRepositoryInterface
{
    public function __construct(JobPosting $model)
    {
        parent::__construct($model);
    }
}
