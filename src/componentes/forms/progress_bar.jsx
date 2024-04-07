import React, { Component } from 'react'

export class progress_bar extends Component {
  render() {
    return (
        <div>
            <div class="position-relative m-4">
                <div class="progress" style={{ height: '1px' }}>
                    <div class="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: '2rem', height: '2rem' }}>
                    1
                </button>
                <button type="button" class="position-absolute top-0 start-25 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: '2rem', height: '2rem' }}>
                    2
                </button>
                <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: '2rem', height: '2rem' }}>
                    3
                </button>
                <button type="button" class="position-absolute top-0 start-75 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: '2rem', height: '2rem' }}>
                    4
                </button>
                <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: '2rem', height: '2rem' }}>
                    5
                </button>

            </div>
        </div>
    )
  }
}

export default progress_bar